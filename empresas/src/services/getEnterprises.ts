import { api } from '../api/api';

interface Enterprise {
    id: 1;
    email_enterprise: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    phone: string;
    own_enterprise: boolean;
    enterprise_name: string;
    photo: string;
    description: string;
    city: string;
    country: string;
    value: number;
    share_price: number;
    enterprise_type: {
        id: number;
        enterprise_type_name: string;
    };
}

interface Response {
    enterprises: Enterprise[];
    success: boolean;
}

interface Error {
    success: boolean;
    errors: string[];
}

export const getEnterprises = async (): Promise<Enterprise[]> => {
    const response: Response = await api.get('/enterprises')
        .then(response => response.data).catch((err: Error) => {throw err.errors[0];});
    return response.enterprises;
};