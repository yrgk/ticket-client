import axios from 'axios';
import { MyTicketResponse, TicketCheckResponse, TicketResponse } from "../types/Ticket";

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


export async function FetchCheckTicket(ticketId: string, validatorId: number): Promise<TicketCheckResponse | null> {
    const url = `https://vellem.catalogio.space/api/v1/ticket/check/${ticketId}?validator_id=${validatorId}`;

    try {
        const response = await axios.get<TicketCheckResponse>(url);
        console.log("response:", response.data);
        console.log("url:", url);
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки формы:", error);
        return null;
    }
}


export async function TakeTicket(payload: any): Promise<boolean> {
    const url = "https://vellem.catalogio.space/api/v1/ticket"

    try {
        const response = await axios.post(url, payload)
        if (response.status != 200) {
            return false
        } else {
            return true
        }
    } catch(error) {
        return false
    }
}


export async function FetchMyTickets(userId: number): Promise<MyTicketResponse[] | null> {
    const url = `https://vellem.catalogio.space/api/v1/ticket/my?user_id=${userId}`;

    try {
        const response = await axios.get<MyTicketResponse[]>(url);
        console.log("response:", response.data);
        console.log("url:", url);
        return response.data;
    } catch (error) {
        console.error("Ошибка загрузки формы:", error);
        return null;
    }
}