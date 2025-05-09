import './CreateForm.css';


import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type FieldType = 'string' | 'number' | 'email' | 'checkbox';

interface Field {
  name: string;
  type: FieldType;
}

function CreateForm() {
    const tg = WebApp;
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState<Field[]>([]);
    const [participantsLimit, setParticipantsLimit] = useState(0);
    const userId = tg.initDataUnsafe.user?.id

    const handleAddField = () => {
        setFields([...fields, { name: '', type: 'string' }]);
        tg.HapticFeedback.impactOccurred('light');
    };

    const handleFieldChange = (index: number, key: keyof Field, value: string) => {
        const updatedFields = [...fields];
        updatedFields[index][key] = value as FieldType;
        setFields(updatedFields);
    };

    const handleSubmit = useCallback(async () => {
        const payload = {
            title,
            fields,
            user_id: userId,
            participants_limit: participantsLimit,
        };

        try {
            const response = await axios.post('https://vellem.catalogio.space/api/v1/form', payload);
            return response.status === 200;
        } catch (error) {
            console.error(error);
            alert(error);
            return false;
        }
    }, [title, fields, userId, participantsLimit]);

    useEffect(() => {
        tg.ready();

        // Main button initializing
        tg.MainButton.setText("Создать")
        tg.MainButton.show();


        const onBackClick = () => {
            tg.HapticFeedback.impactOccurred('medium');
            navigate(-1);
            tg.BackButton.hide();
        }

        tg.BackButton.show()
        tg.onEvent('backButtonClicked', onBackClick)

        const handleClick = async () => {
            tg.HapticFeedback.impactOccurred('medium');
            const isSuccessful = await handleSubmit();
            if (isSuccessful) {
                navigate("/success");
            } else {
                tg.showAlert("Что-то пошло не так, попробуйте позже");
            }
        };

        tg.onEvent('mainButtonClicked', handleClick);
        return () => tg.offEvent('mainButtonClicked', handleClick);
    }, [handleSubmit]);

    return (
        <div className="create-form-screen">
            <h1>Создание формы</h1>

            <div className="form-block">
                <h4>Название формы</h4>
                <input
                    className="form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{backgroundColor: tg.themeParams.secondary_bg_color}}
                />

                <h4>Количество билетов</h4>
                <input
                    type="number"
                    className="form-input"
                    placeholder="Количество"
                    value={participantsLimit}
                    style={{backgroundColor: tg.themeParams.secondary_bg_color}}
                    onChange={(e) => setParticipantsLimit(Number(e.target.value))}
                />
            </div>

            <div className="fields">
                {fields.map((field, index) => (
                    <div key={index} className="field-block">
                        <input
                            className="form-input"
                            placeholder="Название поля"
                            value={field.name}
                            style={{backgroundColor: tg.themeParams.secondary_bg_color}}
                            onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                        />

                        <select
                            className="select-type"
                            value={field.type}
                            onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                        >
                            <option value="string">Строка</option>
                            <option value="number">Число</option>
                            <option value="email">Email</option>
                            <option value="checkbox">Флажок</option>
                        </select>
                    </div>
                ))}
            </div>

            <button
                className="add-field"
                onClick={handleAddField}
            >
                Добавить поле
            </button>
        </div>
    );
};

export default CreateForm;