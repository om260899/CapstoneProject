export interface Signup {
    username: string,
    email: string,
    password: string
}

export interface Login {
    username: string,
    password: string
}

export interface UserAuth {
    username: string,
    token: string
}
