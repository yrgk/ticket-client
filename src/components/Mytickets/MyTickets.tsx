import WebApp from '@twa-dev/sdk';
import './MyTickets.css'
import { useEffect, useState } from 'react';
import { FetchMyTickets } from '../../utils/ticketFetches';
import { MyTicketResponse } from '../../types/Ticket';
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';

function MyTickets() {
    const tg = WebApp;
    const navigate = useNavigate();
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

    }, [userId]);

    const onTicketClick = (ticketId: string) => {
        navigate(`/ticket/${ticketId}?user_id=${userId}`, { state: { fromOtherPage: true } })
    }

    return (
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
                    <Loading/>
            }
        </div>
    )
}

export default MyTickets;