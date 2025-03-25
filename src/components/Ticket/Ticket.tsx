import WebApp from '@twa-dev/sdk'
import './Ticket.css'
import { useEffect } from 'react';

function Ticket() {
    const tg = WebApp;

    tg.MainButton.show();

    useEffect(() => {
        tg.onEvent('mainButtonClicked', function() {
            tg.HapticFeedback.impactOccurred('light')
            tg.close()
        })
    }, []);

    tg.MainButton.setParams({
        text: `Закрыть`
    });

    return (
        <div className="qr-code-screen">
            <div className="qr-code-block">
                <img id="qr-code" src="https://storage.yandexcloud.net/ticket-bucket/123456789122024-12-17%2019%3A21%3A00.493884%20%2B0300%20MSK%20m%3D%2B60.649606917" alt="" />
            </div>

            <h3>Gorillaz "Humanz Tour" - Concert in Berlin</h3>
            <h2>Standard</h2>
        </div>
    )
}

export default Ticket