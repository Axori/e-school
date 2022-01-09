import React, {useEffect, useState} from "react";
import ItemSelect from "../../components/ItemSelect/ItemSelect";
import MarksTable from "../../components/MarksTable/MarksTable";
import client from "../../client";
import {USER_ROLES} from "../../constants";
import {getGroupClassesUrlByUser} from "../../helpers/urls";

const View = ({user}) => {
    const [groups, setGroups] = useState();
    const [selectedGroup, setSelectedGroup] = useState();
    const [subjects, setSubjects] = useState();
    const [selectedSubject, setSelectedSubject] = useState();
    const [studentsMarks, setStudentsMarks] = useState();
    const [studentsMarksLoading, setStudentsMarksLoading] = useState(true);

    console.log(user)

    const fetchAndProcessGroupClasses = () => {
        client({
            method: 'GET',
            path: getGroupClassesUrlByUser(user)
        }).done(
            (resp) => {
                const groupClasses = user.role !== USER_ROLES.ADMIN ? [resp.entity] : resp.entity._embedded.groupClasses;
                const mappedGroups = groupClasses.map((group) => {
                    const {
                        name: groupName,
                        _embedded: {teacher: {name}},
                        _links: {self: {href}}
                    } = group;

                    return ({value: href, label: `${name} - ${groupName}`, object: group});
                });

                setGroups(mappedGroups);
                setSelectedGroup(mappedGroups[0]);
            });
    }

    useEffect(() => {
        fetchAndProcessGroupClasses();
    }, []);

    useEffect(() => {
        if (selectedGroup) {
            const url = selectedGroup.object._links.subjects.href.split("8080")[1];
            client({method: 'GET', path: url}).done(
                (resp) => {

                    const {subjects} = resp.entity._embedded;
                    const mappedSubjects = subjects.map((subject) => {
                        const {
                            name,
                            _links: {self: {href}}
                        } = subject;

                        return ({value: href, label: name, object: subject});
                    });

                    setStudentsMarksLoading(true);
                    setSubjects(mappedSubjects);
                    setSelectedSubject(mappedSubjects[0]);
                });
        }
    }, [selectedGroup])

    useEffect(() => {
        if (selectedSubject) {
            const newStudentMarks = selectedGroup.object._embedded.students.reduce((prev, {id, name}) => ({
                ...prev,
                [id]: {name, marks: []}
            }), {})

            selectedSubject.object.marks.forEach(
                ({value, _embedded: {student: {id}}}) => {
                    newStudentMarks[id].marks.push(value)

                });
            setStudentsMarks(newStudentMarks)
            setStudentsMarksLoading(false);
        }
    }, [selectedSubject])


    const handleOnGroupChange = (newGroup) => {
        setSelectedGroup(newGroup)
    };

    const handleOnSubjectChange = (newSubject) => {
        setSelectedSubject(newSubject)
    };

    const handleOnMarksSave = (newMarks) => {
        const marks = Object.entries(newMarks).map(([studentId, {marks}]) => {
            return marks.map(mark => ({
                student: `http://localhost:8080/api/students/${studentId}`, value: mark
            }))
        }).reduce((prev, curr) => [...prev, ...curr], []);

        const updatedSubject = {
            marks
        }

        client({
            method: 'PATCH',
            path: selectedSubject.value,
            entity: updatedSubject,
            headers: {'Content-Type': 'application/json'}
        }).done(() => {
            setStudentsMarks()
            setStudentsMarksLoading(true);
            setSelectedSubject();
            setSubjects();
            setSelectedGroup();
            setGroups();
            fetchAndProcessGroupClasses();
        })
    }

    return <>
        <div className="row justify-content-center mt-3">
            <div className="col-lg-6">
                <ItemSelect id="groupSelect" options={groups} onChange={handleOnGroupChange}
                            selected={selectedGroup}/>
            </div>
        </div>
        <div className="row justify-content-center mt-3">
            <div className="col-lg-6">
                <ItemSelect id="subjectSelect" options={subjects} onChange={handleOnSubjectChange}
                            selected={selectedSubject}/>
            </div>
        </div>
        <div className="row justify-content-center mt-3">
            <div className="col-lg-12">
                <MarksTable isStudent={user.role === USER_ROLES.STUDENT} loading={studentsMarksLoading}
                            studentMarks={studentsMarks} onSave={handleOnMarksSave}/>
            </div>
        </div>
    </>
}

export default View;