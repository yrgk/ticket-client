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

function App() {
    // const tg = WebApp;
    // const navigate = useNavigate();

    // useEffect(() => {
    //     const startParam = tg.initDataUnsafe?.start_param ?? "";

    //     if (startParam) {
    //         const startData = startParam.split("_");

    //         switch (startData[0]) {
    //             case "form":
    //                 navigate(`/form/${startData[1]}`);
    //                 break;
    //             case "ticket":
    //                 navigate(`/ticket/${startData[1]}`);
    //                 break;
    //             case "check":
    //                 navigate(`/check/${startData[1]}`);
    //                 break;
    //             default:
    //                 navigate("/");
    //                 break;
    //         }
    //     }
    // }, [navigate]);



    return (
        <BrowserRouter>
        <Routes>
            {/* Main page */}
            <Route index element={<MainPage/>}/>

            {/* My projects page */}
            <Route path='projects/my' element={<MainPage/>}/>

            {/* Watching ticket */}
            <Route path='ticket/:ticketId' element={<Ticket/>}/>

            {/* Checking ticket */}
            <Route path='ticket/check/:ticketId' element={<CheckTicket/>}/>

            {/* Make form */}
            {/* <Route index element={<CreateForm/>}/> */}
            <Route path='form/create' element={<CreateForm/>}/>

            {/* Watching form */}
            <Route path='form/:formId' element={<Form/>}/>

            {/* Succesful page */}
            <Route path='success' element={<Successful/>}/>
            {/* <Route index element={<Successful/>}/> */}

        </Routes>
        </BrowserRouter>
    )
}

export default App
