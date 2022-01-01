package com.ztp.eschool;

import com.ztp.eschool.entities.*;
import com.ztp.eschool.enums.Role;
import com.ztp.eschool.repositories.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.StreamSupport;

@Component
@Profile("dev")
public class DatabaseLoader implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TeacherRepository teacherRepository;
    private final StudentRepository studentRepository;
    private final GroupClassRepository groupClassRepository;
    private final SubjectRepository subjectRepository;
    private final MarkRepository markRepository;

    public DatabaseLoader(UserRepository userRepository, TeacherRepository teacherRepository, StudentRepository studentRepository, GroupClassRepository groupClassRepository, SubjectRepository subjectRepository, MarkRepository markRepository) {
        this.userRepository = userRepository;
        this.teacherRepository = teacherRepository;
        this.studentRepository = studentRepository;
        this.groupClassRepository = groupClassRepository;
        this.subjectRepository = subjectRepository;
        this.markRepository = markRepository;
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
        AtomicInteger i = new AtomicInteger();
        return teachers.stream().map(teacher -> {
            GroupClass groupClass = GroupClass.builder().name("Group " + i.incrementAndGet()).teacher(teacher).build();
            return groupClassRepository.save(groupClass);
        }).collect(Collectors.toList());
    }

    private List<Student> createStudentsWithMarks(List<GroupClass> groupClasses, int numberOfStudents) {

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
                    GroupClass groupClass = groupClasses.get(index);
                    Student student = Student.builder().user(user).groupClass(groupClass).build();

                    Student savedStudent = studentRepository.save(student);
                    groupClass.getSubjects().forEach(subject -> {
                        markRepository.save(Mark.builder().student(student).subject(subject).value(5).build());
                        markRepository.save(Mark.builder().student(student).subject(subject).value(4).build());
                    });
                    return savedStudent;
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
        this.createStudentsWithMarks(groupClasses, 6);
    }

    private void createSubjects(List<GroupClass> groupClasses) {
        groupClasses.stream().forEach(groupClass -> {
            Subject math = Subject.builder().name("Math").groupClass(groupClass).build();
            Subject geography = Subject.builder().name("Geography").groupClass(groupClass).build();
            List<Subject> subjects = StreamSupport.stream(subjectRepository.saveAll(Arrays.asList(math, geography)).spliterator(), false).collect(Collectors.toList());
            groupClass.setSubjects(subjects);
        });
    }
}
