import { Time } from "@angular/common"

export interface UpdateUser {
    username: string,
    email: string
}

export interface UserDetail {
    id: number,
    username: string,
    email: string,
    notes: Notes[]
}

export interface Notes {
    id: number,
    userId: number,
    note: string,
    date: Date,
    time: Time
}
