import WebApp from '@twa-dev/sdk'
import './Ticket.css'
import { useEffect, useState } from 'react';
import { TicketResponse } from '../../types/Ticket';
import { FetchTicket } from '../../utils/ticketFetches';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Ticket() {
    const tg = WebApp;
    const location = useLocation();
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const [ queryParams ] = useSearchParams();

    const userId = Number(queryParams.get("user_id"))

    const [ticket, setTicket] = useState<TicketResponse>()

    const onBack = () => {
        tg.HapticFeedback.impactOccurred('medium');
        tg.MainButton.hide();
        tg.BackButton.hide();
        navigate(-1);
    }


    useEffect(() => {
        // Init main button
        tg.MainButton.show();

        if (location.state && location.state.fromOtherPage) {
            tg.BackButton.show();
            tg.MainButton.setText("Назад")
            tg.onEvent('mainButtonClicked', onBack);

        } else {
            tg.MainButton.setParams({
                text: `Закрыть`
            });

            tg.onEvent('mainButtonClicked', function() {
                tg.HapticFeedback.impactOccurred('medium');
                tg.close();
            });
        }

        const loadTicket = async () => {
            if (ticketId) {
                const data = await FetchTicket(ticketId, userId);
                if (data) {
                    setTicket(data);
                }
            }
        };
        loadTicket();


        tg.onEvent('backButtonClicked', onBack);

    }, [ticketId]);

    return ticket ? (
        <div className="qr-code-screen">
            <div className="qr-code-block">
                {
                    ticket.is_activated ?
                        <div className="img-activated">
                            <DotLottieReact
                                className='image-check'
                                src="/_069_007_pen_OUT.json"
                                loop
                                autoplay
                            />
                        </div>
                    :
                        <img id="qr-code" src={ticket?.qr_code_url} alt="" />
                }
            </div>
            {
                ticket.is_activated ?
                    <h4 id='activated'>Активирован</h4>
                :
                    <h4></h4>
            }
            <h3 id='main-text'>{ticket?.title}</h3>
            <h3 id='main-text'>{ticket?.variety}</h3>
        </div>
    ) : (
        <Loading/>
    );
}

export default Ticket