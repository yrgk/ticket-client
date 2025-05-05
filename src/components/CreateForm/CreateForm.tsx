import './CreateForm.css';

// function CreateForm() {
//     return (
//         <>
//         </>
//     )
// }

// export default CreateForm;

import WebApp from '@twa-dev/sdk';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type FieldType = 'string' | 'number' | 'email' | 'checkbox';

interface Field {
  name: string;
  type: FieldType;
}

const FormBuilder: React.FC = () => {
    const tg = WebApp;
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [fields, setFields] = useState<Field[]>([]);
    const [participantsLimit, setParticipantsLimit] = useState(0);
    const userId = Number(tg.initDataUnsafe.user?.first_name)

    const handleAddField = () => {
        setFields([...fields, { name: '', type: 'string' }]);
    };

    const handleFieldChange = (index: number, key: keyof Field, value: string) => {
        const updatedFields = [...fields];
        updatedFields[index][key] = value as FieldType;
        setFields(updatedFields);
    };

    async function handleSubmit() {
        const payload = {
            title,
            fields,
            user_id: userId,
            participants_limit: participantsLimit,
        };

        try {
            const response = await axios.post('https://vellem.catalogio.space/api/v1/form', payload);
            if (response.status != 200) {
                return false
            } else {
                return true
            }
        } catch (error) {
            console.error(error);
            alert(error)
            return false
        }
    };

    useEffect(() => {
        const handleClick = async () => {
            tg.HapticFeedback.impactOccurred('light');
            const isSuccessful = await handleSubmit();
            if (isSuccessful) {
                navigate("/success");
            } else {
                tg.showAlert("Что-то пошло не так, попробуйте позже")
            }
        };

        tg.onEvent('mainButtonClicked', handleClick);

        return () => {
            tg.offEvent('mainButtonClicked', handleClick);
        };
    }, []);

    // Main button initializing
    tg.MainButton.show();
    tg.MainButton.setText("Создать")

    return (
        <div className="create-form-screen">
            <h1>id:</h1>
            <h1>{userId}</h1>
            <h1>Создание формы</h1>

            <div className="form-block">
                <h4>Название формы</h4>
                <input
                    className="form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <h4>Лимит регистраций</h4>
                <input
                    type="number"
                    className="form-input"
                    placeholder="Лимит участников"
                    value={participantsLimit}
                    onChange={(e) => setParticipantsLimit(Number(e.target.value))}
                />
            </div>

        <div className="fields">
            {fields.map((field, index) => (
                <div key={index} className="field-block">
                    <input
                        // className="name-field"
                        className="form-input"
                        placeholder="Название поля"
                        value={field.name}
                        onChange={(e) => handleFieldChange(index, 'name', e.target.value)}
                    />

                    <select
                        className="select-type"
                        // className="form-input"
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

export default FormBuilder;