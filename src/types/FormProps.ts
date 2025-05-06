export type FormProps = {
    type: string;
    name: string;
}

export type FormResponse = {
    id: number;
    [x: string]: any;
    title: string;
    fields: {
        name: string;
        type: string;
    }[];
}