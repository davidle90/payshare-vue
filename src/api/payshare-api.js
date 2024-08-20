import axios from "axios";

const API_URL = import.meta.env.VITE_PAYSHARE_API_URL;
const API_KEY = import.meta.env.VITE_PAYSHARE_API_KEY;
const BASE_URL = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;


export const login = async (email, password) => {
    try {
        const loginForm = {
            'email': email,
            'password': password
        }

        const response = await axios.post(
            `${BASE_URL}login`,
            loginForm,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        );

        const token = response.data.data.token;
        localStorage.setItem('authToken', token);

        return { success: true, message: "Authenticated" };

    } catch (error) {
        if(error.response && (error.response.status == 422 || error.response.status == 401)){
            const errorMessage = 'Invalid email or password.'
            return { success: false, message: errorMessage };
        } else {
            const errorMessage = 'Login failed: ' + error.message;
            return { success: false, message: errorMessage };
        }
    }
}

export const createGroup = async (name) => {
    try {

        const authToken = localStorage.getItem('authToken');

        const groupForm = {
            "data": {
                "attributes": {
                    "name": name
                },
            }
        }

        const response = await axios.post(
            `${BASE_URL}v1/groups`,
            groupForm,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return { success: true, message: "Group created." };
        
    } catch (error) {
        if(error.response && (error.response.status == 422 || error.response.status == 401)){
            const errorMessage = 'Invalid group name.'
            return { success: false, message: errorMessage };
        } else {
            const errorMessage = 'Error creating group: ' + error.message;
            return { success: false, message: errorMessage };
        }
    }
}

export const getGroups = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        const response = await axios.get(
            `${BASE_URL}v1/groups`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching groups: ', error);
    }
}