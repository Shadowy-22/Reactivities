import axios, { AxiosResponse } from 'axios';
import { store } from '../stores/store';

// Create an Axios instance for Activities
const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL, 
});

// The interceptor is used for simulating a Delay in the response.
const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

apiClient.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    } finally {
        store.uiStore.isIdle()
    }
})

apiClient.interceptors.request.use(config => {
    store.uiStore.isBusy()
    return config;
})

// Generalization of API requests
const responseBody = <T> (response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T> (url: string) => apiClient.get<T>(url).then(responseBody),
    post: <T> (url: string, body: object) => apiClient.post<T>(url, body).then(responseBody),
    put: <T> (url: string, body: object) => apiClient.put<T>(url, body).then(responseBody),
    del: <T> (url: string) => apiClient.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities', activity),
    update: (activity: Activity) => requests.put<void>(`/activities`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;