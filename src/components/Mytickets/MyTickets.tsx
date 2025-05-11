import WebApp from '@twa-dev/sdk';
import './MyTickets.css'
import { useEffect, useState } from 'react';
import { FetchMyTickets } from '../../utils/ticketFetches';
import { MyTicketResponse } from '../../types/Ticket';
import { useLocation, useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function MyTickets() {
    const tg = WebApp;
    const navigate = useNavigate();
    const location = useLocation();
    const userId = tg.initDataUnsafe.user?.id;
    const [tickets, setTickets] = useState<MyTicketResponse[] | null>(null);

    useEffect(() => {
        const loadMyTickets = async () => {
            if (userId) {
                const data = await FetchMyTickets(userId ?? 0)
                if (data) {
                    setTickets(data)
                }
            }
        }
        loadMyTickets();

        tg.MainButton.show();
        tg.MainButton.setText("Меню партнёра");
        tg.onEvent('mainButtonClicked', function() {
            tg.MainButton.hide();
            navigate("main");
        })
    }, [userId, navigate, location]);

    const onTicketClick = (ticketId: string) => {
        tg.MainButton.hide();
        navigate(`/ticket/${ticketId}?user_id=${userId}`, { state: { fromOtherPage: true } })
    }

    return (
        <>
            <div className="my-tickets-screen">
                {
                    tickets ?
                        <>
                            {
                                tickets.map(
                                    (ticket) => (
                                        <div
                                            key={ticket.ticket_id}
                                            className="ticket-base"
                                            onClick={() => onTicketClick(ticket.ticket_id)}
                                        >
                                            <div className="cover-block">
                                                <img id='ticket-cover' src="https://cdn.vectorstock.com/i/500p/42/43/admission-ticket-emoji-icon-access-vector-55454243.jpg" alt="" />
                                            </div>
                                            {
                                                ticket.title.length > 60 ?
                                                    <h6 id='main-text'>{ticket.title.substring(0, 60)}...</h6>
                                                :
                                                <h6 id='main-text'>{ticket.title}</h6>
                                            }
                                        </div>
                                    )
                                )
                            }
                        </>

                    :
                        <div className='not-yet'>
                            <div className="not-yet-block">
                                <DotLottieReact
                                    className='image-check'
                                    src="/_DUCK16_HEY_OUT.json"
                                    loop
                                    autoplay
                                    />
                                <h3 id='main-text'>Здесь пока ничего нет</h3>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default MyTickets;