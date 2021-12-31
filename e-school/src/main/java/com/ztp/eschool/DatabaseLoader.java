package com.ztp.eschool;

import com.ztp.eschool.entities.*;
import com.ztp.eschool.enums.Role;
import com.ztp.eschool.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
@Profile("dev")
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final GroupClassRepository groupClassRepository;
    private final SubjectRepository subjectRepository;

    public DatabaseLoader(UserRepository userRepository, TeacherRepository teacherRepository, StudentRepository studentRepository, GroupClassRepository groupClassRepository, SubjectRepository subjectRepository) {
        this.userRepository = userRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.groupClassRepository = groupClassRepository;
        this.subjectRepository = subjectRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        this.populateDatabaseWithMockedData();

    }

    private List<Teacher> createTeachers(int numberOfTeachers) {
        return IntStream.rangeClosed(1, numberOfTeachers)
                .boxed().map((id) -> {
                    User user = User.builder()
                            .username("teacher")
                            .password("teacher" + id)
                            .firstName("teacherName" + id)
                            .lastName("teacherSurname" + id)
                            .role(Role.TEACHER)
                            .build();
                    Teacher teacher = Teacher.builder().user(user).build();
                    return teacherRepository.save(teacher);
                }).collect(Collectors.toList());
    }

    private List<GroupClass> createGroupClass(List<Teacher> teachers) {
        return teachers.stream().map(teacher -> {
            GroupClass groupClass = GroupClass.builder().name("Group " + teacher.getUser().getFirstName()).teacher(teacher).build();
            return groupClassRepository.save(groupClass);
        }).collect(Collectors.toList());
    }

    private List<Student> createStudents(List<GroupClass> groupClasses, int numberOfStudents) {

        return IntStream.rangeClosed(1, numberOfStudents)
                .boxed().map((id) -> {
                    User user = User.builder()
                            .username("student")
                            .password("student" + id)
                            .firstName("studentName" + id)
                            .lastName("studentSurname" + id)
                            .role(Role.STUDENT)
                            .build();
                    int index = (id % groupClasses.size());
                    Student student = Student.builder().user(user).groupClass(groupClasses.get(index)).build();

                    return studentRepository.save(student);
                }).collect(Collectors.toList());
    }

    private void populateDatabaseWithMockedData() {
        User wasdam = User.builder()
                .username("wasdam")
                .password("P@ssw0rd")
                .firstName("Damian")
                .lastName("Wasilenko")
                .role(Role.ADMIN)
                .build();
        User tabdaw = User.builder()
                .username("tabdaw")
                .password("123")
                .firstName("Dawid")
                .lastName("Taborski")
                .role(Role.ADMIN)
                .build();
        userRepository.saveAll(Arrays.asList(tabdaw, wasdam));


        List<Teacher> teachers = this.createTeachers(2);
        List<GroupClass> groupClasses = this.createGroupClass(teachers);
        this.createSubjects(groupClasses);
        this.createStudents(groupClasses, 6);
    }

    private void createSubjects(List<GroupClass> groupClasses) {
        groupClasses.stream().forEach(groupClass -> {
            Subject math = Subject.builder().name("Math").groupClass(groupClass).build();
            Subject geography = Subject.builder().name("Geography").groupClass(groupClass).build();

            subjectRepository.saveAll(Arrays.asList(math, geography));
        });
    }
}
