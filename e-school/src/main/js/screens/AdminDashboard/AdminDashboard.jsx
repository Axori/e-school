import React, {useState, useEffect} from 'react'
import client from '../../client'

const AdminDashboard = () => {
    const [groups, setGroups] = useState([])
    const fetchGroups = () => {
        client({method: 'GET', path: '/api/groupClasses'})
            .then(res => {
                const {groupClasses} = res.entity._embedded
                setGroups(groupClasses)
            })
    }
    useEffect(() => {
        fetchGroups()
    }, [])

    const handleOnGroupClassDelete = (id) => {
        client({method: 'DELETE', path: `/api/groupClasses/${id}`})
            .then(() => {
                fetchGroups()
            })
    }

    return (
        <>
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Teacher</th>
                        <th scope="col">Group name</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {groups.map(group => (
                        <tr key={group.name}>
                            <td>{group._embedded.teacher.name}</td>
                            <td>{group.name}</td>
                            <td>
                                <button type="button" className="btn btn-danger"
                                        onClick={() => handleOnGroupClassDelete(group.id)}>Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

        </>
    )
}

export default AdminDashboard
