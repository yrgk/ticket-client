export type FormProps = {
    type: string;
    name: string;
}

export type FormResponse = {
    id: number;
    [x: string]: any;
    is_full: boolean;
    title: string;
    fields: {
        name: string;
        type: string;
    }[];
}