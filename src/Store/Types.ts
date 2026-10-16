export interface TUser {
    name: string;
    email: string;
    avatar: string;
    job: string;
    age: number;
    status: boolean;
    id: any;
}

export interface TInitialState {
    user: TUser[];
    error: any;
    loading: boolean
}