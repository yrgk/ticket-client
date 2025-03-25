import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.css'
import Ticket from './components/Ticket/Ticket'

function App() {
    return (
        <BrowserRouter>
        <Routes>
            {/* <Route index element={<h1>Main page</h1>}/> */}

            {/* Watching ticket */}
            <Route index element={Ticket}/>

            {/* Checking ticket */}
            <Route index element={Ticket}/>

            {/* Watching event page */}
            <Route index element={Ticket}/>

            {/* Signing up to event */}
            <Route index element={Ticket}/>

            {/* Succesful page */}
            <Route index element={Ticket}/>

        </Routes>
        </BrowserRouter>
    )
}

export default App
