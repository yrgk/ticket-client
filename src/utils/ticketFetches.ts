import axios from 'axios';
import { TicketResponse } from "../types/Ticket";

export async function FetchTicket(ticketId: string, userId: number): Promise<TicketResponse | null> {
    const url = `https://vellem.catalogio.space/api/v1/ticket/${ticketId}?user_id=${userId}`;

    try {
        const response = await axios.get<TicketResponse>(url);
        console.log("response:", response.data);
        console.log("url:", url);
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки формы:", error);
        return null;
    }
}

export async function TakeTicket(): Promise<boolean> {
    const url = "https://vellem.catalogio.space/api/v1/ticket"

    const data = {

    }

    try {
        const response = await axios.post(url, data)
        if (response.status != 200) {
            return false
        } else {
            return true
        }
    } catch(error) {
        return false
    }
}