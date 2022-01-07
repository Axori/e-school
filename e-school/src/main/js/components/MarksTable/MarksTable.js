import React, {useEffect, useState} from 'react';
import {cloneDeep} from "lodash";
import Loader from "../Loader/Loader";

const MarksTable = ({loading, studentMarks, onSave, isStudent}) => {
    const [studentMarksCopy, setStudentMarksCopy] = useState();
    const [hasChanges, setHasChanges] = useState(false);
    const numberOfMarkColumns = 10;

    useEffect(() => {
        if (studentMarks) {
            const newStudentMarks = cloneDeep(studentMarks);
            Object.keys(newStudentMarks).map((key) => {
                const {marks} = newStudentMarks[key];
                const lengthDifference = numberOfMarkColumns - marks.length;
                const numberOfExtraInputs = lengthDifference >= 0 ? lengthDifference : 0;

                const newMarks = [...marks, ...(new Array(numberOfExtraInputs).fill(0))];
                newStudentMarks[key].marks = newMarks;
            });

            setStudentMarksCopy(newStudentMarks);
            setHasChanges(false);
        }
    }, [studentMarks]);

    const handleOnChange = (id, index) => (e) => {
        if (e.target.checkValidity()) {
            const newValue = parseInt(e.target.value);
            const newStudentMarks = cloneDeep(studentMarksCopy);
            newStudentMarks[id].marks.splice(index, 1, newValue);
            setStudentMarksCopy(newStudentMarks);
            setHasChanges(true);
        }
    }

    const handleOnSave = () => {
        onSave(Object.entries(studentMarksCopy).reduce((prev, [id, studentMark]) => ({
            ...prev,
            [id]: {
                ...studentMark,
                marks: studentMark.marks.filter(el => el > 0)
            }
        }), {}))
    }
    console.log("loading, marks, marksCopy", studentMarks, studentMarksCopy)
    return <div className="MarksTable d-flex justify-content-center">
        {!loading && studentMarksCopy ? <div className="MarksTable__container">
                <table id="MarksTable" className="table">
                    <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col" colSpan={numberOfMarkColumns}>Marks</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.entries(studentMarksCopy).map(([id, {name, marks}]) =>
                        <tr key={id}>
                            <th scope="row">{name}</th>
                            {marks.map((mark, index) =>
                                <td className="MarksTable__input" key={`${name}-mark-${index}`}>
                                    {!isStudent ?
                                        <input className="form-control" type="number" min={0} max={6}
                                               value={mark}
                                               onChange={handleOnChange(id, index)}/> : mark}
                                </td>
                            )}
                        </tr>
                    )}
                    </tbody>
                </table>
                {!isStudent && hasChanges && <button className="btn btn-success" onClick={handleOnSave}>Save</button>}
            </div>
            : <Loader/>}
    </div>
}

export default MarksTable;