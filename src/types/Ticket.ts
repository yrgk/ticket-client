export type TicketProps = {
    title: string,
    qr_code_url: string,
    form_id: number,
    is_activated: boolean,
}

export type TicketResponse = {
    title: string,
    qr_code_url: string,
    form_id: number,
    variety: string,
    is_activated: boolean,
}

export type MyTicketResponse = {
    title: string,
    cover_url: string,
    ticket_id: string,
    variety: string,
    is_activated: boolean,
}

export type TicketCheckResponse = {
    title: string,
    is_activated: boolean,
    variety: string,
}

export type TicketPayload = {
    user_id: number;
    form_id: string | undefined;
    form_data: { [key: string]: string };
};