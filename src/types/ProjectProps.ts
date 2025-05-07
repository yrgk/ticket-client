export type MyProjectResponse = {
    Forms: myForm[];
}

type myForm = {
    public_id: string;
    title: string;
    participants_count: number;
    participants_limit: number;
}