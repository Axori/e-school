import React, {useState, useEffect} from 'react'
import client from '../../client'
import ItemSelect from '../../components/ItemSelect/ItemSelect'
import {useNavigate} from "react-router-dom";

const StudentInput = ({onChange}) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleFirstNameChange = (e) => {
        const {value} = e.target
        setFirstName(value)
        onChange({
            firstName: value,
            lastName
        })
    }

    const handleLastNameChange = (e) => {
        const {value} = e.target
        setLastName(value)
        onChange({
            firstName,
            lastName: value
        })
    }

    return (
        <div className="row justify-content-center mb-3">
            <div className="col-lg-6">
                <input value={firstName} placeholder="First name" onChange={handleFirstNameChange}
                       className="form-control"/>
            </div>
            <div className="col-lg-6">
                <input value={lastName} placeholder="Last name" onChange={handleLastNameChange}
                       className="form-control"/>
            </div>
        </div>
    )
}

const SubjectInput = ({onChange}) => {
    const [name, setName] = useState("")

    const handleOnChange = (e) => {
        setName(e.target.value)
        onChange(e.target.value)
    }

    return (
        <input value={name} onChange={handleOnChange} placeholder="Subject's name" className="form-control mb-3"/>
    )
}

const CreateGroup = () => {
    let navigate = useNavigate();
    const [groupName, setGroupName] = useState("")
    const [teachers, setTeachers] = useState([])
    const [selectedTeacher, setSelectedTeacher] = useState()
    const [subjects, setSubjects] = useState([])
    const [studentsList, setStudentsList] = useState([])

    useEffect(() => {
        client({method: 'GET', path: `/api/teachers`})
            .then((res) => {
                const {teachers} = res.entity._embedded
                setTeachers(teachers)
                setSelectedTeacher({
                    label: teachers[0].name,
                    value: teachers[0]._links.self.href
                })
            })
    }, [])

    const handleOnAddStudent = () => {
        const studentsListCopy = [...studentsList]

        studentsListCopy.push({})

        setStudentsList(studentsListCopy)
    }

    const handleOnAddSubject = () => {
        const subjectsCopy = [...subjects]

        subjectsCopy.push({})

        setSubjects(subjectsCopy)
    }

    const createUserForStudent = (student) => {
        return client({
            method: 'POST',
            path: '/api/users',
            entity: {
                firstName: student.firstName,
                lastName: student.lastName,
                role: "STUDENT",
                username: (student.firstName.substr(0, 3) + student.lastName.substr(0, 3)).toLowerCase(),
                password: "123"
            },
            headers: {'Content-Type': 'application/json'}
        })
    }

    const createStudent = (userHref, groupClassHref) => {
        return client({
            method: 'POST',
            path: '/api/students',
            entity: {
                user: userHref,
                groupClass: groupClassHref
            },
            headers: {'Content-Type': 'application/json'}
        })
    }

    const createSubject = (name, groupClassHref) => {
        return client({
            method: 'POST',
            path: '/api/subjects',
            entity: {
                name,
                groupClass: groupClassHref
            },
            headers: {'Content-Type': 'application/json'}
        })
    }

    const handleOnSave = () => {
        client({
            method: 'POST',
            path: '/api/groupClasses',
            entity: {
                name: groupName,
                teacher: selectedTeacher.value,
            },
            headers: {'Content-Type': 'application/json'}
        }).then((groupClass) => {

            studentsList.forEach(async student => {
                const res = await createUserForStudent(student)
                const {href} = res.entity._links.self
                return await createStudent(href, groupClass.entity._links.self.href)
            })

            subjects.forEach(async subject => await createSubject(subject, groupClass.entity._links.self.href))

            setStudentsList([])
            setSubjects([])
            setGroupName("")

            navigate("/admin")
        })


    }

    return (
        <div>
            <div className="row justify-content-center mt-3">
                <div className="col-lg-6 text-center">
                    <h1>Create group</h1>
                </div>
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-lg-6">
                    <label className="form-label">Group name</label>
                    <input className="form-control" value={groupName} onChange={(e) => {
                        setGroupName(e.target.value)
                    }}/>

                </div>
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-lg-6">
                    <label className="form-label">Teacher</label>
                    <ItemSelect id="subjectSelect" options={teachers.map(teacher => ({
                        label: teacher.name,
                        value: teacher._links.self.href
                    }))} onChange={setSelectedTeacher}
                                selected={selectedTeacher}/>
                </div>
            </div>

            <div className="row justify-content-center mt-3">
                <div className="col-lg-6">
                    <div className="d-flex justify-content-between mb-3">
                        <label className="form-label">Subjects</label>
                        <button type="button" className="btn btn-primary"
                                onClick={handleOnAddSubject}>
                            Add subject
                        </button>
                    </div>
                    <div>
                        {subjects.map((subject, index) => (
                            <SubjectInput key={index} onChange={(subject) => {
                                const subjectsCopy = [...subjects]

                                subjectsCopy[index] = subject
                                setSubjects(subjectsCopy)
                            }}/>
                        ))}
                    </div>
                </div>
            </div>

            <div className="row justify-content-center mt-3">
                <div className="col-lg-6">
                    <div className="d-flex justify-content-between mb-3">
                        <label className="form-label">Students list</label>
                        <button type="button" className="btn btn-primary" onClick={handleOnAddStudent}>
                            Add student
                        </button>
                    </div>
                    <div>
                        {studentsList.map((studentItem, index) => (
                            <StudentInput key={index} {...studentItem} onChange={(student) => {
                                const studentsListCopy = [...studentsList]

                                studentsListCopy[index] = student

                                setStudentsList(studentsListCopy)
                            }}/>
                        ))}
                    </div>

                    <button type="button" className="btn btn-success"
                            disabled={teachers.length <= 0 || subjects.length <= 0}
                            onClick={handleOnSave}>Save
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CreateGroup
