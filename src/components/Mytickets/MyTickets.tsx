import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyTicketResponse } from '../../types/Ticket';
import { FetchMyTickets } from '../../utils/ticketFetches';
import './MyTickets.css';
// import Loading from '../Loading/Loading';

function MyTickets() {
    const tg = WebApp;
    const navigate = useNavigate();
    const location = useLocation();
    const userId = tg.initDataUnsafe.user?.id;
    // const userId = 123
    const [isLoading, setIsLoading] = useState(false);
    const [tickets, setTickets] = useState<MyTicketResponse[] | null>(null);

    useEffect(() => {
        const loadMyTickets = async () => {
            if (userId) {
                const data = await FetchMyTickets(userId ?? 0)
                setIsLoading(true)
                if (data) {
                    setTickets(data)
                }
            }
        }
        loadMyTickets();

    }, [userId, navigate, location]);

    const onTicketClick = (ticketId: string) => {
        tg.MainButton.hide();
        navigate(`/ticket/${ticketId}?user_id=${userId}`, { state: { fromOtherPage: true } })
    }

    if (!isLoading) {
        // return <Loading/>
        return <></>
    }

    return (
        <>
            <div className="my-tickets-screen">
            {/* <h1 id='main-tickets-text'>Мои билеты</h1> */}
                {
                    tickets ?
                        <>
                            <h2 id='main-tickets-text'>Мои билеты</h2>
                            {
                                tickets.map(
                                    (ticket) => (
                                        <div
                                            key={ticket.ticket_id}
                                            className="ticket-base"
                                            onClick={() => onTicketClick(ticket.ticket_id)}
                                        >
                                            <div className="cover-block">
                                                <img id='ticket-cover' src={ticket.cover_url} alt="" />
                                                <div className="cover-text">#{ticket.ticket_number}</div>
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