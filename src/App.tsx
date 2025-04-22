import WebApp from '@twa-dev/sdk';
import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Camera from './components/Camera/Camera';
import CheckTicket from './components/CheckTicket/CheckTicket';
import CreateForm from './components/CreateForm/CreateForm';
import Event from './components/Event/Event';
import Form from './components/Form/Form';
import Successful from './components/Successful/Successful';
import Ticket from './components/Ticket/Ticket';

function App() {
    const tg = WebApp

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <BrowserRouter>
        <Routes>
            <Route index element={<Event/>}/>

            {/* Watching ticket */}
            <Route path='ticket/:id' element={<Ticket/>}/>

            {/* Camera */}
            <Route path='camera' element={<Camera/>}/>

            {/* Checking ticket */}
            <Route path='ticket/check' element={<CheckTicket/>}/>

            {/* Watching event page */}
            <Route path='event/:id' element={<Event/>}/>

            {/* Make form */}
            <Route path='form/make' element={<CreateForm/>}/>

            {/* Watching form */}
            {/* <Route path='form/:id' element={<Form/>}/> */}
            <Route index element={<Form/>}/>

            {/* Choose a book */}
            <Route path='schedule/:id' element={<Successful/>}/>

            {/* Succesful page */}
            <Route path='success' element={<Successful/>}/>

        </Routes>
        </BrowserRouter>
    )
}

export default App
