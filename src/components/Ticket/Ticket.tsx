import WebApp from '@twa-dev/sdk'
import './Ticket.css'
import { useEffect, useState } from 'react';
import { TicketResponse } from '../../types/Ticket';
import { FetchTicket } from '../../utils/ticketFetches';
import { useParams, useSearchParams } from 'react-router-dom';

function Ticket() {
    const tg = WebApp;
    const { ticketId } = useParams();
    const [ queryParams ] = useSearchParams();

    const userId = Number(queryParams.get("user_id"))

    const [ticket, setTicket] = useState<TicketResponse>()

    tg.MainButton.show();

    useEffect(() => {
        const loadTicket = async () => {
            if (ticketId) {
                const data = await FetchTicket(ticketId, userId)
                if (data) {
                    setTicket(data)
                }
            }
        }
        loadTicket();

        tg.onEvent('mainButtonClicked', function() {
            tg.HapticFeedback.impactOccurred('light')
            tg.close()
        })

    }, [ticketId]);

    tg.MainButton.setParams({
        text: `Закрыть`
    });

    return (
        <div className="qr-code-screen">
            <div className="qr-code-block">
                <img id="qr-code" src={ticket?.qr_code_url} alt="" />
            </div>

            <h3 id='main-text'>{ticket?.title}</h3>
            <h4 id='main-text'>{ticket?.variety}</h4>
        </div>
    )
}

export default Ticket