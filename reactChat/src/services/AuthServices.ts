import {AuthServiceProps} from "../@types/auth-service"
import axios from "axios";

export function useAuthService(): AuthServiceProps {
    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post(
                "http://127.0.0.1:8000/api/token/", {
                    username, password
                }
            );
        } catch (error: any) {
            return error;
        }
    }
    return {login}
}