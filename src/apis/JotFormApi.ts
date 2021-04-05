import axios, { Method } from 'axios';
const baseUrl = 'https://api.jotform.com';
export const JotFormApi = (APIKEY: string) => {
    const makeRequest = async (url: string, method?: Method) => {
        return axios({
            url,
            method: method ?? 'GET',
            headers: {
                APIKEY,
            },
        });
    };
    const listForms = async () => {
        const { data } = await makeRequest(`${baseUrl}/user/forms`);
        return data?.content;
    };
    const listFormWebhooks = async (formId: string) => {
        const { data } = await makeRequest(`${baseUrl}/form/${formId}/webhooks`);
        return data?.content;
    };
    const listFormSubmissions = async (formId: string) => {
        const { data } = await makeRequest(`${baseUrl}/form/${formId}/submissions`);
        return data?.content;
    };
    return {
        listForms,
        listFormWebhooks,
        listFormSubmissions,
    };
};
