import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormResponse } from '../../types/FormProps';
import FetchForm from '../../utils/formFetches';
import './Form.css';

function Form() {
    const tg = WebApp;
    const { formId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<FormResponse | null>(null)


    // Main Button setting
    tg.MainButton.show();
    tg.MainButton.setParams({
        text: `Отправить`
    });

    useEffect(() => {
        // Loading form
        const loadForm = async () => {
            if (formId) {
                const data = await FetchForm(formId);
                if (data) {
                    setForm(data);
                }
            }
        };
        loadForm();

        // Adding main button for getting a ticket
        tg.onEvent('mainButtonClicked', function() {
            tg.HapticFeedback.impactOccurred('light')
            // !!!! ADD CHECKING IF EMPTY
            navigate("/success")
        })

    }, [formId]);

    return (
        form ? (
            <div className='form-screen'>
                <h2 id="main-text">{form.title}</h2>

                <div className="form-block">
                    {form.fields.map((field, index) => (
                        <input
                            key={index}
                            className="form-input"
                            type={field.type}
                            placeholder={field.name}
                            required
                        />
                    ))}
                </div>
            </div>
        ) : (
            <h1>Loading</h1> // Change
        )
    );
}

export default Form;