import React, { useState, useEffect } from 'react'
import client from '../client'
import ItemSelect from '../components/ItemSelect/ItemSelect'

const StudentInput = ({onChange}) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    const handleFirstNameChange = (e) => {
        const { value } = e.target
        setFirstName(value)
        onChange({
            firstName: value,
            lastName
        })
    }

    const handleLastNameChange = (e) => {
        const { value } = e.target
        setLastName(value)
        onChange({
            firstName,
            lastName: value
        })
    }

    return (
        <div>
            <input value={firstName} placeholder="First name" onChange={handleFirstNameChange} />
            <input value={lastName} placeholder="Last name" onChange={handleLastNameChange} />
        </div>
    )
}

const CreateGroup = () => {
    const [groupName, setGroupName] = useState("")

    const [teachers, setTeachers] = useState([])
    const [selectedTeacher, setSelectedTeacher] = useState()

    const [studentsList, setStudentsList] = useState([])

    useEffect(() => {
        client({ method: 'GET', path: `/api/teachers`})
        .then((res) => {
            const { teachers } = res.entity._embedded
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

    const createUserForStudent = (student) => {
        return client({
            method: 'POST',
            path: '/api/users',
            entity: {
                firstName: student.firstName,
                lastName: student.lastName,
                role: "STUDENT",
                username: (student.firstName.substr(0,3) + student.lastName.substr(0,3)).toLowerCase(),
                password: "123"
            },
            headers: {'Content-Type': 'application/json'}
        })
    }

    const createStudent = (userHref) => {
        return client({
            method: 'POST',
            path: '/api/students',
            entity: {
                user: userHref
            },
            headers: {'Content-Type': 'application/json'}
        })

    }

    const handleOnSave = () => {
        const studentsPromises = studentsList.map(async student => {
            return createUserForStudent(student).then(async res => {
                const { href } = res.entity._links.self

                return createStudent(href)
            })
        })

        Promise.all(studentsPromises).then(students => {

            const studentsHrefs = students.map(student => student.entity._links.self.href)

            client({
                method: 'POST',
                path: '/api/groupClasses',
                entity: {
                    name: groupName,
                    teacher: selectedTeacher.value,
                    students: studentsHrefs
                },
                headers: {'Content-Type': 'application/json'}
            })
        })
    }

    return (
        <div>
            <h1>Create group</h1>
            <div className="row justify-content-center mt-3">
                <div className="col-lg-6">
                    <label className="form-label">Group name</label>
                    <input className="form-control" value={groupName} onChange={(e) => {
                        setGroupName(e.target.value)
                    }} />

                </div>
            </div>
            <div className="row justify-content-center mt-3">
                <div className="col-lg-6">
                    <label className="form-label">Teacher</label>
                    <ItemSelect id="subjectSelect" options={teachers.map(teacher => ({label: teacher.name, value: teacher._links.self.href}))} onChange={setSelectedTeacher}
                                selected={selectedTeacher}/>
                </div>
            </div>

            <div className="row justify-content-center mt-3">
                <div className="col-lg-6">
                    <label>Students list</label>
                    <div>
                        {studentsList.map((studentItem, index) => (
                            <StudentInput key={index} {...studentItem} onChange={(student) => {
                                const studentsListCopy = [...studentsList]

                                studentsListCopy[index] = student

                                setStudentsList(studentsListCopy)
                            }} />    
                        ))}
                        
                        <button type="button" className="btn btn-primary" onClick={handleOnAddStudent}>Add student</button>
                    </div>

                    <button type="button" className="btn btn-success" onClick={handleOnSave}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default CreateGroup
