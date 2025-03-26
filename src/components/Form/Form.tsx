import { useEffect } from 'react';
import './Form.css'
import WebApp from '@twa-dev/sdk';

function Form() {
    const tg = WebApp;

    tg.MainButton.show();

    useEffect(() => {
        tg.onEvent('mainButtonClicked', function() {
            tg.HapticFeedback.impactOccurred('light')
        })
    }, []);

    tg.MainButton.setParams({
        text: `Зарегестрироваться`
    });



    return (
        <div className='form-screen'>
            <h2 id="main-text">Gorillaz "Humanz Tour" - Concert in Berlin</h2>

            <div className="form-block">
                <input className="form-input" type="number" placeholder='Номер телефона'/>
                <input className="form-input" type="email" placeholder='Электронная почта'/>
                <input className="form-input" placeholder='Фамилия, имя'/>
                {/* <input className="form-input" type="checkbox" placeholder='Номер телефона'/> */}
            </div>
        </div>
    )
}

export default Form