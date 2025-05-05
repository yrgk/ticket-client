import WebApp from '@twa-dev/sdk';
import './CheckTicket.css'
import { useEffect } from 'react';

function CheckTicket() {
    const tg = WebApp;

    const userId = tg.initDataUnsafe.user?.id
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
            <h1>{userId}</h1>
        </>
    )
}

export default CheckTicket