import { useEffect, useState } from 'react';
import './Form.css'
import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';
import { FormProps } from '../../types/FormProps';

function Form() {
    const tg = WebApp;
    const navigate = useNavigate();
    const [fields, setFields] = useState<FormProps[]>([])

    const response = {
        title: "Регистрация на хакатон 6 мая в IT-парке им. Башира Рамеева",
        fields: [
            {
                name: "Название команды",
                type: "text",
            },
            {
                name: "Количество участников",
                type: "number",
            },
            {
                name: "Направление",
                type: "text",
            },
            {
                name: "Telegram для контактов",
                type: "text",
            },
        ]
    }

    const response1 = {
        title: "Мастер класс по лепке из глины",
        fields: [
            {
                "name": "Имя",
                "type": "text"
            },
            {
                "name": "Телефон",
                "type": "tel"
            },
            {
                "name": "Email",
                "type": "email"
            },
            {
                "name": "Уровень подготовки",
                "type": "select"
            }
        ]
    }

    const response2 = [
        {
            "name": "Имя",
            "type": "text"
        },
        {
            "name": "Телефон",
            "type": "tel"
        },
        {
            "name": "Email",
            "type": "email"
        },
        {
            "name": "Дата и время аренды",
            "type": "datetime-local"
        },
        {
            "name": "Длительность (в часах)",
            "type": "number"
        },
        {
            "name": "Нужны ли осветительные приборы?",
            "type": "checkbox"
        },
        {
            "name": "Комментарий",
            "type": "textarea"
        }
    ]


    // Main Button setting
    tg.MainButton.show();
    tg.MainButton.setParams({
        text: `Отправить`
    });

    // Back Button setting
    tg.BackButton.show()

    useEffect(() => {
        setFields(response.fields)
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
            <h2 id="main-text">{response.title}</h2>

            <div className="form-block">
                {fields.map((field) => (
                    <input className="form-input" type={field.type} placeholder={field.name}/>
                ))}
            </div>
        </div>
    )
}

export default Form