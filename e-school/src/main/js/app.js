import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom';
import client from './client';
import {useEffect, useState} from "react";
import View from "./screens/View/View";
import AdminDashboard from './screens/View/AdminDashboard';

const App = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        client({method: 'GET', path: 'api/users/search/me'}).done(loggedUser => {
            setUser(loggedUser.entity);
        });
    }, [])


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/view" element={user && <View user={user}/>}/>
                <Route path="/admin/*" element={user && <AdminDashboard user={user}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
)