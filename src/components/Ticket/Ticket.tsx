import WebApp from '@twa-dev/sdk';
import './Ticket.css';
import { useEffect, useState } from 'react';
import { TicketResponse } from '../../types/Ticket';
import { FetchTicket } from '../../utils/ticketFetches';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Ticket() {
    const tg = WebApp;
    const location = useLocation();
    const navigate = useNavigate();
    const { ticketId } = useParams();
    const userId = Number(tg.initDataUnsafe.user?.id);
    const [isShow, setIsShow] = useState(false)
    const [ticket, setTicket] = useState<TicketResponse | null>(null);

    const onBack = () => {
        tg.HapticFeedback.impactOccurred('medium');
        tg.MainButton.hide();
        tg.BackButton.hide();
        navigate(-1);
    };

    const setupMainButton = () => {
        tg.MainButton.show();
        if (location.state?.fromOtherPage) {
            tg.BackButton.show();
            tg.MainButton.setText("Назад");
            tg.onEvent('mainButtonClicked', onBack);
        } else {
            tg.MainButton.setParams({ text: 'Закрыть' });
            tg.onEvent('mainButtonClicked', () => {
                tg.HapticFeedback.impactOccurred('medium');
                tg.close();
            });
        }
    };

    const loadTicket = async () => {
        if (ticketId) {
            try {
                const data = await FetchTicket(ticketId, userId);
                if (data) {
                    setTicket(data);
                }
            } catch (error) {
                console.error('Failed to load ticket:', error);
            }
        }
    };

    const onClick = () => {
        tg.HapticFeedback.impactOccurred("heavy");
        setIsShow(!isShow);
    };

    useEffect(() => {
        setupMainButton();
        loadTicket();
        tg.onEvent('backButtonClicked', onBack);

        return () => {
            tg.offEvent('mainButtonClicked', onBack);
            tg.offEvent('backButtonClicked', onBack);
        };
    }, [ticketId, location, isShow]);

    if (!ticket) {
        // return <Loading />;
        return <></>;
    }


    return (
        <div className="qr-code-screen">
            <div className="qr-code-block">
                {ticket.is_activated ? (
                    <div className="img-activated">
                        <DotLottieReact
                            className="image-check"
                            src="/_069_007_pen_OUT.json"
                            loop
                            autoplay
                        />
                    </div>
                ) : (
                    <>
                        {
                            isShow ? (
                                <img onClick={onClick} id="qr-code" src={ticket.qr_code_url} alt="QR Code" />
                            ) : (
                                <div onClick={onClick} className="cover-block">
                                    <img id="qr-code" src={ticket.cover_url} alt="QR Code" />
                                    <div className="cover-text"><h1>#{ticket.ticket_number}</h1></div>
                                </div>
                            )
                        }
                    </>
                )}
            </div>
            {ticket.is_activated && <h4 id="activated">Активирован</h4>}
            <h3 id="main-text">{ticket.title}</h3>
            {/* <h3 id="main-text">{ticket.variety}</h3> */}
        </div>
    );
}

export default Ticket;
