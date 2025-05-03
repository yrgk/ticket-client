export type FormProps = {
    type: string;
    name: string;
}

export type FormResponse = {
    [x: string]: any;
    title: string;
    fields: {
        name: string;
        type: string;
    }[];
}