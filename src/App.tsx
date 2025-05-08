// import WebApp from '@twa-dev/sdk';
// import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import CheckTicket from './components/CheckTicket/CheckTicket';
import CreateForm from './components/CreateForm/CreateForm';
import Form from './components/Form/Form';
import Successful from './components/Successful/Successful';
import Ticket from './components/Ticket/Ticket';
import MainPage from './components/MainPage/MainPage';
import Connector from './components/Connector/Connector';
import MyProjects from './components/MyProjects/MyProjects';
import MyTickets from './components/Mytickets/MyTickets';

function App() {
    return (
        <BrowserRouter>
        <Routes>
            {/* Connector page */}
            {/* <Route index element={<Connector/>}/> */}

            {/* Main page */}
            <Route path='main' element={<MainPage/>}/>

            {/* My projects page */}
            <Route path='projects/my' element={<MyProjects/>}/>
            {/* <Route index element={<MyProjects/>}/> */}

            {/* Watching ticket */}
            <Route path='ticket/:ticketId' element={<Ticket/>}/>

            {/* Checking ticket */}
            <Route path='ticket/check/:ticketId' element={<CheckTicket/>}/>

            {/* Make form */}
            <Route path='form/create' element={<CreateForm/>}/>

            {/* Watching form */}
            <Route path='form/:formId' element={<Form/>}/>

            {/* Succesful page */}
            <Route path='success' element={<Successful/>}/>
            {/* <Route index element={<Successful/>}/> */}

            {/* My tickets page */}
            {/* <Route path='ticket/my' element={<MyTickets/>}/> */}
            <Route index element={<MyTickets/>}/>

        </Routes>
        </BrowserRouter>
    )
}

export default App
