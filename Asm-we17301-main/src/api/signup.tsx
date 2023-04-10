import { IUser } from "../interface/user";
import instance from "./instance"

export const logup = (user: IUser) => {
    return instance.post('/signup', user);
}