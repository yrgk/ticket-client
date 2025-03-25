import WebApp from '@twa-dev/sdk'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react';

import './App.css'
import Ticket from './components/Ticket/Ticket'

function App() {
    const tg = WebApp

    useEffect(() => {
        tg.ready();
    }, [])

    return (
        <BrowserRouter>
        <Routes>
            {/* <Route index element={<h1>Main page</h1>}/> */}

            {/* Watching ticket */}
            <Route index element={<Ticket/>}/>
            {/* <Route path='ticket/:id' element={<Ticket/>}/> */}

            {/* Checking ticket */}
            <Route path='ticket/check' element={<Ticket/>}/>

            {/* Watching event page */}
            <Route path='event/:id' element={<Ticket/>}/>

            {/* Signing up to event */}
            <Route path='event/sign' element={<Ticket/>}/>

            {/* Succesful page */}
            <Route path='success' element={<Ticket/>}/>

        </Routes>
        </BrowserRouter>
    )
}

export default App
