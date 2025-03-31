import WebApp from '@twa-dev/sdk'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react';

import './App.css'
import Ticket from './components/Ticket/Ticket'
import CheckTicket from './components/CheckTicket/CheckTicket';
import Event from './components/Event/Event'
import Successful from './components/Successful/Successful';
import Form from './components/Form/Form';
import Camera from './components/Camera/Camera';

function App() {
    const tg = WebApp

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <BrowserRouter>
        <Routes>
            {/* <Route index element={<h1>Main page</h1>}/> */}
            <Route index element={<Event/>}/>

            {/* Watching ticket */}
            <Route path='ticket/:id' element={<Ticket/>}/>

            {/* Camera */}
            <Route path='camera' element={<Camera/>}/>

            {/* Checking ticket */}
            <Route path='ticket/check' element={<CheckTicket/>}/>

            {/* Watching event page */}
            <Route path='event/:id' element={<Event/>}/>

            {/* Signing up to event */}
            <Route path='form/:id' element={<Form/>}/>

            {/* Choose a book */}
            <Route path='schedule/:id' element={<Successful/>}/>

            {/* Succesful page */}
            <Route path='success' element={<Successful/>}/>

        </Routes>
        </BrowserRouter>
    )
}

export default App
