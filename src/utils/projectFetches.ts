import axios from 'axios';
import { MyProjectResponse } from "../types/ProjectProps";

export default async function FetchMyProjects(userId: number): Promise<MyProjectResponse | null> {
    const url = `https://vellem.catalogio.space/api/v1/form/my?user_id=${userId}`;

    try {
        const response = await axios.get<MyProjectResponse>(url);
        console.log("response:", response.data);
        console.log("url:", url);
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки формы:", error);
        return null;
    }
}