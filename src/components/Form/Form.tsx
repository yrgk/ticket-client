import WebApp from '@twa-dev/sdk';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FormResponse, Variety } from '../../types/FormProps';
import FetchForm from '../../utils/formFetches';
import './Form.css';
import { TakeTicket } from '../../utils/ticketFetches';
import Loading from '../Loading/Loading';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function Form() {
    const tg = WebApp;
    const { formId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<FormResponse | null>(null);
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [selectedVariety, setSelectedVariety] = useState<Variety>();


    // Loading form
    useEffect(() => {
        tg.MainButton.show();
        tg.MainButton.setParams({ text: "Отправить" });

        const loadForm = async () => {
            if (formId) {
                const data = await FetchForm(formId);
                if (data) {
                    setForm(data);
                }
            }
        };
        loadForm();
    }, [formId, tg]);

    // Handler for sending a filled form
    const handleSendForm = useCallback(async () => {
        if (!form) return;

        const isEmpty = form.fields.some(field => !formData[field.name]?.trim());
        if (isEmpty) {
            tg.showAlert("Пожалуйста, заполните все поля");
            return;
        }

        const payload = {
            user_id: tg.initDataUnsafe.user?.id,
            form_id: form.id,
            form_data: formData,
            variety: selectedVariety
        };

        const isSuccess = await TakeTicket(payload);
        if (isSuccess) {
            tg.MainButton.hide()
            navigate("/success", { state: { title: form.title } });
        } else {
            tg.showAlert("Что-то пошло не так, попробуйте позже");
        }
    }, [form, formData, formId, navigate]);


    // Sending filled form
    useEffect(() => {
        const onClick = () => {
            tg.HapticFeedback.impactOccurred('heavy');
            handleSendForm();
        };

        if (form?.is_full) {
            tg.MainButton.setText("Закрыть")
            tg.onEvent('mainButtonClicked', function() {
                tg.close();
            })
        } else {
            tg.onEvent('mainButtonClicked', onClick);
            return () => {
                tg.offEvent('mainButtonClicked', onClick);
            };
        }

    }, [handleSendForm, selectedVariety]);


    // Handling on changing value in some field
    const handleInputChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleVarietySelect = (variety: any) => {
        setSelectedVariety(variety);
        setTimeout(() => {
            tg.MainButton.setText(`Далее | ${variety.price}₽ · ${variety.title}`);
            tg.MainButton.show();
        }, 50)
    };

    return form ? (
        form.is_full ?
            // full form
            <div>
                <div className="full-form-screen">
                    <DotLottieReact
                        className='image-check'
                        src="/_DUCK8_SAD_OUT.json"
                        loop
                        autoplay
                    />

                    <h2 id='main-text'>Билеты закончились</h2>
                    <h4 id='main-text'>Мы уверены - вы ещё успеете</h4>
                </div>
            </div>
        :
            form.fields.length == 0 ?
                form.varieties.length == 0 ?
                    form.layout.schema == null ?
                        // Without fields an hall layout
                        <div className='full-form-screen'>
                                <DotLottieReact
                                    className='image-check'
                                    src="/_037_SECURITY_OUT.json"
                                    loop
                                    autoplay
                                    />
                                <h3 id='main-text'>{form.title}</h3>
                            </div>
                    :
                        // Hall layout
                        <div className='form-screen'>
                            <h2 id="main-text">{form.title}</h2>

                        </div>
                :
                    // Main form
                    <>
                        <div className='full-form-variety-screen'>
                            <DotLottieReact
                                className='image-check'
                                src="/_037_SECURITY_OUT.json"
                                loop
                                autoplay
                                />
                            <h3 id='main-text'>{form.title}</h3>
                        </div>

                        <div className="variety-scroll-container">
                            {form.varieties.map((variety) => (
                                <div
                                    key={variety.id}
                                    className={`variety-card ${selectedVariety?.id === variety.id ? 'selected' : ''}`}
                                    onClick={() => handleVarietySelect(variety)}
                                >
                                    <img src={variety.cover_url} alt={variety.title} className="variety-image" />
                                    <h4 className="variety-title">{variety.title}</h4>
                                    <h4 className="variety-price">{variety.price}₽</h4>
                                </div>
                            ))}
                        </div>
                    </>
            :
                // Form with fields
                <div className='form-screen'>
                    <h2 id="main-text">{form.title}</h2>

                    <div className="form-block">
                        {
                            form.fields.map((field, index) => (
                                <input
                                    key={index}
                                    className="form-input"
                                    type={field.type}
                                    placeholder={field.name}
                                    required
                                    value={formData[field.name] || ''}
                                    onChange={e => handleInputChange(field.name, e.target.value)}
                                />
                            ))
                        }
                    </div>
                </div>
    ) : (
        <Loading/>
    );
}

export default Form;