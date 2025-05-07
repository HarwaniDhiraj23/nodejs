export interface AddUserRequestBody {
    name: string;
    email: string;
    password: string;
}

export interface UpdateUserRequestBody {
    name?: string;
    email?: string;
}

