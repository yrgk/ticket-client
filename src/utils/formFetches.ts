import { FormResponse } from "../types/FormProps";

import axios from 'axios';

export default async function FetchForm(formId: string): Promise<FormResponse | null> {
    const url = `https://vellem.catalogio.space/api/v1/form/${formId}`;

    try {
        const response = await axios.get<FormResponse>(url);
        console.log("response:", response.data);
        console.log("url:", url);
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки формы:", error);
        return null;
    }
}