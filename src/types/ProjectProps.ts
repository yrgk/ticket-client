export type MyProjectResponse = {
    Forms: {
        public_id: string;
        title: string;
        participants_count: number;
        participants_limit: number;
    }[];
}