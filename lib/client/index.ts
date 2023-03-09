import { Client } from './client';

export const client = new Client({
    baseUrl: process.env.NEXT_PUBLIC_PROJECT_API_SERVER || '',
    auth: typeof window !== 'undefined' ? (localStorage.getItem('token') as string) : undefined,
});

if (typeof window !== 'undefined') {
    client.updateAuth(localStorage.getItem('token') as string);
}
