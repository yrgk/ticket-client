import { useEffect, useState } from 'react';
import './Form.css'
import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';
import { FormProps } from '../../types/FormProps';

function Form() {
    const tg = WebApp;
    const navigate = useNavigate();
    const [fields, setFields] = useState<FormProps[]>([])

    const response = [
        {
            name: "Электронная почта",
            type: "email",
        },
        {
            name: "Никнейм",
            type: "text",
        },
        {
            name: "ELO",
            type: "number",
        },
        {
            name: "Игра",
            type: "text",
        },
    ]


    // Main Button setting
    tg.MainButton.show();
    tg.MainButton.setParams({
        text: `Отправить`
    });

    // Back Button setting
    tg.BackButton.show()

    useEffect(() => {
        setFields(response)
        tg.onEvent('mainButtonClicked', function() {
            tg.HapticFeedback.impactOccurred('light')
            // !!!! ADD CHECKING IF EMPTY
            navigate("/success")
        })

        tg.onEvent('backButtonClicked', function() {
            tg.HapticFeedback.impactOccurred('light')
            navigate(-1)
        })
    }, []);

    return (
        <div className='form-screen'>
            <h2 id="main-text">Турнир по киберспорту среди юнош до 21 года в Казани 19 апреля 2025 года</h2>

            <div className="form-block">
                {fields.map((field) => (
                    <input className="form-input" type={field.type} placeholder={field.name}/>
                ))}
            </div>
        </div>
    )
}

export default Form