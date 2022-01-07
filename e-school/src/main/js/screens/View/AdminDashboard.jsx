import React, { useState, useEffect } from 'react'
import client from '../../client'
import CreateGroup from '../../containers/CreateGroup'
import {BrowserRouter, Route, Routes} from "react-router-dom";

const Dashboard = () => {
    const [groups, setGroups] = useState([])

    useEffect(() => {
        client({method: 'GET', path: '/api/groupClasses'})
        .then(res => {
            const { groupClasses } = res.entity._embedded
            setGroups(groupClasses)
        })
    }, [])

    const handleOnGroupClassDelete = (id) => {
        client({method: 'DELETE', path: `/api/groupClasses/${id}`})
    }

    return (
        <div>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Group name</th>
                <th scope="col">Teacher</th>
                <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {groups.map(group => (
                    <tr key={group.name}>
                        <th scope="row">1</th>
                        <td>{group._embedded.teacher.name}</td>
                        <td>{group.name}</td>
                        <td>
                            <button type="button" className="btn btn-danger" onClick={() => handleOnGroupClassDelete(group.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}

const AdminDashboard = () => {
    

    return (
        <Routes>
            <Route path="" element={<Dashboard />}/>
            <Route path="create-group" element={<CreateGroup />}/>
        </Routes>
    )
}

export default AdminDashboard
