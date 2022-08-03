import { useAuthStore } from '../modules/auth/store/auth.store';

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
};

function request(method:string) {
    return (url:string, body:any) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        };
        if (body) {
          //@ts-ignore
            requestOptions.headers['Content-Type'] = 'application/json';
            //@ts-ignore
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}

// helper functions

function authHeader(url:string) {
    // return auth header with jwt if user is logged in and request is to the api url
    const { user } = useAuthStore();
    const isLoggedIn = !!user?.token;
    const isApiUrl = url.startsWith('http:localhost:3333');
    if (isLoggedIn && isApiUrl) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {Authorization: `Bearer`};
    }
}

async function handleResponse(response:any) {
    const isJson = response.headers?.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    // check for error response
    if (!response.ok) {
        const { user, logout } = useAuthStore();
        if ([401, 403].includes(response.status) && user) {
            // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            logout();
        }

        // get error message from body or default to response status
        const error = (data && data.errors) || response.status;
        return Promise.reject(error);
    }

    return data;
}
