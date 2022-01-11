import React from 'react';
import {BrowserRouter, Link, Navigate, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom';
import client from './client';
import {useEffect, useState} from "react";
import View from "./screens/View/View";
import AdminDashboard from './screens/AdminDashboard/AdminDashboard';
import {USER_ROLES} from "./constants";
import CreateGroup from "./screens/CreateGroup/CreateGroup";

const App = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        client({method: 'GET', path: 'api/users/search/me'}).done(loggedUser => {
            setUser(loggedUser.entity);
        });
    }, [])

    return (
        <BrowserRouter>
            {user?.role === USER_ROLES.ADMIN && <nav className="navbar navbar-expand-lg navbar-light">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link to="view" className="nav-link">View Groups</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="admin" className="nav-link">Admin Panel</Link>
                    </li>
                    <li className="nav-item active">
                        <Link to="admin/create-group" className="nav-link">View Groups</Link>
                    </li>
                </ul>
            </nav>}
            <Routes>
                <Route path="/view" element={user && <View user={user}/>}/>
                <Route path="/admin" element={user && <AdminDashboard user={user}/>}/>
                <Route path="/admin/create-group" element={<CreateGroup/>}/>
                <Route path="/*" element={<Navigate to="/view"/>}/>
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
)