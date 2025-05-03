import WebApp from '@twa-dev/sdk';
import './CheckTicket.css'
import { useEffect } from 'react';

function CheckTicket() {
    const tg = WebApp;

    // const validatorId = Number(tg.initDataUnsafe.)

    tg.MainButton.show();

    useEffect(() => {
        tg.onEvent('mainButtonClicked', function() {
            tg.HapticFeedback.impactOccurred('medium')
            tg.close()
        })
    }, []);

    tg.MainButton.setParams({
        text: `Активировать`
    });

    return (
        <>

        </>
    )
}

export default CheckTicket