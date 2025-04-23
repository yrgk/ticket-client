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
import MainPage from './components/MainPage/MainPage';

function App() {
    const tg = WebApp

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <BrowserRouter>
        <Routes>
            {/* Main page */}
            <Route index element={<MainPage/>}/>

            {/* My projects page */}
            <Route path='projects/my' element={<MainPage/>}/>

            {/* Watching ticket */}
            <Route path='ticket/:id' element={<Ticket/>}/>

            {/* Checking ticket */}
            <Route path='ticket/check' element={<CheckTicket/>}/>

            {/* Make form */}
            <Route path='form/create' element={<CreateForm/>}/>

            {/* Watching form */}
            {/* <Route path='form/:id' element={<Form/>}/> */}
            <Route index element={<Form/>}/>

            {/* Succesful page */}
            <Route path='success' element={<Successful/>}/>

        </Routes>
        </BrowserRouter>
    )
}

export default App
