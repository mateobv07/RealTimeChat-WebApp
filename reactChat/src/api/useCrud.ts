import useAxiosWithInterceptor from "../util/jwtInterceptor";
import { BASE_URL } from "../config";
import {useState} from 'react';

interface CrudInterface<T> {
    data: T[];
    fetchData: () => Promise<void>;
    error: Error | null;
    isLoading: boolean;
}

const useCrud = <T>(initialData: T[], apiURL: string):CrudInterface<T>  => {
    const jwtAxios = useAxiosWithInterceptor();
    const [data, setData] = useState<T[]>(initialData);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () =>{
        setIsLoading(true);
        try {
            const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {})
            const newData = response?.data
            setData(newData)
            setError(null)
            setIsLoading(false)
            return newData;
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setError(new Error("400"));
            }
            setIsLoading(false);
            throw error;
        }
        // logic
    };

    return {fetchData, data, error, isLoading }
}

export default useCrud;