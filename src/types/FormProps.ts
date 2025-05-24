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
    varieties: Variety[];
    layout: {
        title: string;
        type: string;
        schema: {
            rows: number;
            stage: string;
            aisles: number[];
            columns: number;
        };
        // zones: 
    }
}

export type Variety = {
    id: number;
    title: string;
    cover_url: string;
    price: number;
}