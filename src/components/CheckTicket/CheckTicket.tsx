// import WebApp from '@twa-dev/sdk';
// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './CheckTicket.css';
// import { DotLottieReact } from '@lottiefiles/dotlottie-react';
// import { FetchCheckTicket } from '../../utils/ticketFetches';
// import { TicketCheckResponse } from '../../types/Ticket';
// import Loading from '../Loading/Loading';

// function CheckTicket() {
//     const tg = WebApp;

//     // Use as a validator_id
//     const userId = tg.initDataUnsafe.user?.id;
//     const { ticketId } = useParams();
//     const [ticket, setTicket] = useState<TicketCheckResponse>();


//     useEffect(() => {
//         tg.onEvent('mainButtonClicked', function() {
//             tg.HapticFeedback.impactOccurred('medium')
//             // tg.close()
//         })

//         const loadTicket = async () => {
//             if (ticketId) {
//                 const data = await FetchCheckTicket(ticketId, userId ?? 0);
//                 if (data) {
//                     setTicket(data);
//                 }
//             }
//         };
//         loadTicket();

//         tg.MainButton.setParams({
//             text: `Активировать`
//         });
//         tg.MainButton.show();
//     }, [ticketId, userId]);


//     return ticket ? (
//         <div className="check-screen">
//             <div className="image-block">
//                 <DotLottieReact
//                     className='image-check'
//                     src="/_038_SECURITY_INTRF_OUT.json"
//                     loop
//                     autoplay
//                 />
//             </div>

//             <h3 id='title-text'>{ticket.title}</h3>
//             <h3 id='title-text'>{ticket.variety}</h3>
//         </div>
//     ) : (
//         <Loading/>
//     )
// }

// export default CheckTicket


import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './CheckTicket.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FetchCheckTicket } from '../../utils/ticketFetches';
import { TicketCheckResponse } from '../../types/Ticket';
import Loading from '../Loading/Loading';
import axios from 'axios';

function CheckTicket() {
    const tg = WebApp;
    const userId = tg.initDataUnsafe.user?.id;
    const { ticketId } = useParams();
    const [ticket, setTicket] = useState<TicketCheckResponse>();

    useEffect(() => {
        tg.onEvent('mainButtonClicked', async function () {
            if (!ticket?.is_activated && ticketId && userId) {
                tg.HapticFeedback.impactOccurred('medium');
                try {
                    await axios.post(`https://vellem.catalogio.space/api/v1/ticket/validate/${ticketId}?validator_id=${userId}`);
                    // Обновим состояние после активации
                    const updated = await FetchCheckTicket(ticketId, userId);
                    if (updated) {
                        setTicket(updated);
                    }
                } catch (error) {
                    console.error('Ошибка активации билета:', error);
                }
            }
        });

        const loadTicket = async () => {
            if (ticketId && userId) {
                const data = await FetchCheckTicket(ticketId, userId);
                if (data) {
                    setTicket(data);
                }
            }
        };

        loadTicket();
    }, [ticketId, userId]);

    useEffect(() => {
        if (ticket) {
            if (ticket.is_activated) {
                tg.MainButton.setParams({
                    text: 'Активирован',
                    is_active: false,
                    color: '#cccccc'
                });
            } else {
                tg.MainButton.setParams({
                    text: 'Активировать',
                    is_active: true
                });
            }
            tg.MainButton.show();
        }
    }, [ticket]);

    return ticket ? (
        <div className="check-screen">
            <div className="image-block">
                <DotLottieReact
                    className="image-check"
                    src={ticket.is_activated ? "/_037_SECURITY_OUT.json" : "/_038_SECURITY_INTRF_OUT.json"}
                    loop
                    autoplay
                />
            </div>
            <h3 id="title-text">{ticket.title}</h3>
            <h3 id="title-text">{ticket.variety}</h3>
        </div>
    ) : (
        <Loading />
    );
}

export default CheckTicket;