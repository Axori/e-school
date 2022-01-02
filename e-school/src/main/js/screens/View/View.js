import React, {useEffect, useState} from "react";
import ItemSelect from "../../components/ItemSelect/ItemSelect";
import MarksTable from "../../components/MarksTable/MarksTable";
import client from "../../client";
import {USER_ROLES} from "../../constants";


const View = ({user}) => {
    const [groups, setGroups] = useState();
    const [selectedGroup, setSelectedGroup] = useState();
    const [subjects, setSubjects] = useState();
    const [selectedSubject, setSelectedSubject] = useState();
    const [studentsMarks, setStudentsMarks] = useState();
    const [studentsMarksLoading, setStudentsMarksLoading] = useState(true);
    const isTeacher = user?.role === USER_ROLES.TEACHER;

    useEffect(() => {
        console.log("isTeacher", isTeacher)

        client({
            method: 'GET',
            path: isTeacher ? `/api/groupClasses/search/teacherGroup?id=${user.id}` : '/api/groupClasses'
        }).done(
            (resp) => {
                const groupClasses = isTeacher ? [resp.entity] : resp.entity._embedded.groupClasses;
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
            const newStudentMarks = selectedSubject.object.marks.reduce(
                (prev, {value, _embedded: {student: {name, id}}}) => {
                    const oldObject = prev[id];
                    return {
                        ...prev,
                        [id]: {
                            name,
                            marks: oldObject ? oldObject.marks.concat([value]) : [value]
                        }
                    };
                }, {});

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
        console.log("newMarks", newMarks);
    }

    return <>
        <div className="row justify-content-center mt-3">
            <div className="col-lg-6">
                <ItemSelect disabled={isTeacher} id="groupSelect" options={groups} onChange={handleOnGroupChange}
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
                <MarksTable loading={studentsMarksLoading} studentMarks={studentsMarks} onSave={handleOnMarksSave}/>
            </div>
        </div>
    </>
}

export default View;