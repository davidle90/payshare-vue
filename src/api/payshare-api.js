import axios from "axios";

const API_URL = import.meta.env.VITE_PAYSHARE_API_URL;
const API_KEY = import.meta.env.VITE_PAYSHARE_API_KEY;
const BASE_URL = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;


export const payshareLogin = async (email, password) => {
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
        const errorMessage = 'Login failed: ' + (error.response?.data?.message || error.message);
        return { success: false, message: errorMessage };
    }
}