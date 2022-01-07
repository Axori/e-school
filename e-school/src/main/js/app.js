import React, { createContext } from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom';
import client from './client';
import {useEffect, useState} from "react";
import View from "./screens/View/View";
import StudentDashboard from './screens/View/StudentDashboard';
import TeacherDashboard from './screens/View/TeacherDashboard';
import AdminDashboard from './screens/View/AdminDashboard';
import CreateGroup from './containers/CreateGroup';

const userContext = createContext({ user: { role: ""}})

const App = () => {
    const [user, setUser] = useState({role: ""});

    useEffect(() => {
        client({method: 'GET', path: 'api/users/search/me'}).done(loggedUser => {
            setUser(loggedUser.entity);
        });
    }, [])


    return (
        <userContext.Provider value={user}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={user && <View/>}/>
                    <Route path="/student" element={user && <StudentDashboard />}/>
                    <Route path="/teacher" element={user && <TeacherDashboard />}/>
                    <Route path="/admin/*" element={user && <AdminDashboard />}/>
                </Routes>
            </BrowserRouter>
        </userContext.Provider>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
)

export {userContext}