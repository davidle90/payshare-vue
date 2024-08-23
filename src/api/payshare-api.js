import axios from "axios";

const API_URL = import.meta.env.VITE_PAYSHARE_API_URL;
const API_KEY = import.meta.env.VITE_PAYSHARE_API_KEY;
const BASE_URL = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;

export const login = async (email, password) => {
    try {
        const form = {
            'email': email,
            'password': password
        }

        const response = await axios.post(
            `${BASE_URL}login`,
            form,
            {
                headers: {
                    'Accept': 'application/json',
                }
            }
        );

        const token = response.data.data.token;
        const user_reference = response.data.data.user_reference;
        localStorage.setItem('authToken', token);
        localStorage.setItem('user_reference', user_reference);

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

export const logout = async () => {
    try {
        const authToken = localStorage.getItem('authToken');

        const response = await axios.post(
            `${BASE_URL}logout`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return { success: true, message: 'Successfully logged out.' };

    } catch (error) {
        const errorMessage = 'Error while logging out: ' + error.message;
        return { success: false, message: errorMessage };
    }
}

export const getUserData = async () => {
    try {
        const authToken = localStorage.getItem('authToken');
        const user_reference_id = localStorage.getItem('user_reference');

        const response = await axios.get(
            `${BASE_URL}v1/users/${user_reference_id}?include=groups`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        const errorMessage = 'Error fetching user data: ' + error.message;
        return { success: false, message: errorMessage };
    }
}

export const createGroup = async (name) => {
    try {

        const authToken = localStorage.getItem('authToken');

        const form = {
            "data": {
                "attributes": {
                    "name": name
                },
            }
        }

        const response = await axios.post(
            `${BASE_URL}v1/groups`,
            form,
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

export const editGroup = async (reference_id, name, isResolved) => {
    try {
        const authToken = localStorage.getItem('authToken');

        const form = {
            "data": {
                "attributes": {
                    "name": name,
                    "isResolved": isResolved
                },
            }
        }        

        const response = await axios.patch(
            `${BASE_URL}v1/groups/${reference_id}`,
            form,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return response.data;
        
    } catch (error) {
        if(error.response && (error.response.status == 422 || error.response.status == 401)){
            const errorMessage = 'Invalid group name.'
            return { success: false, message: errorMessage };
        } else {
            const errorMessage = 'Error updating group: ' + error.message;
            return { success: false, message: errorMessage };
        }
    }
}

export const getAllGroups = async () => {
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

export const getGroup = async (reference_id) => {
    try {
        const authToken = localStorage.getItem('authToken');

        const response = await axios.get(
            `${BASE_URL}v1/groups/${reference_id}?include=payments,members`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching group: ', error);
    }
}

export const deleteGroup = async (reference_id) => {
    try {
        const authToken = localStorage.getItem('authToken');

        const response = await axios.delete(
            `${BASE_URL}v1/groups/${reference_id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return { success: true, message: "Group deleted." };
    } catch (error) {
        const errorMessage = 'Error deleting group: ' + error.message;
            return { success: false, message: errorMessage };
    }
}

export const createPayment = async (group_reference_id, label, contributors, participants) => {
    try {
        const authToken = localStorage.getItem('authToken');

        const form = {
            "data": {
                "attributes": {
                    "label": label
                },
                "relationships": {
                    "contributors": contributors,
                    "participants": participants
                }
            }
        }        

        const response = await axios.post(
            `${BASE_URL}v1/groups/${group_reference_id}/payments`,
            form,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return { success: true, message: "Payment created." };

    } catch (error) {
        if(error.response && (error.response.status == 422 || error.response.status == 401)){
            const errorMessage = 'Validation error';
            return { success: false, message: errorMessage };
        } else {           
            const errorMessage = 'Error creating payment: ' + error.message;
            return { success: false, message: errorMessage };
        }
    }
}

export const editPayment = async (group_reference_id, payment_reference_id, label, contributors, participants) => {
    try {
        const authToken = localStorage.getItem('authToken');

        const form = {
            "data": {
                "attributes": {
                    "label": label
                },
                "relationships": {
                    "contributors": contributors,
                    "participants": participants
                }
            }
        }      

        const response = await axios.patch(
            `${BASE_URL}v1/groups/${group_reference_id}/payments/${payment_reference_id}`,
            form,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return response.data;

    } catch (error) {        
        if(error.response && (error.response.status == 422 || error.response.status == 401)){
            const errorMessage = 'Validation error';            
            return { success: false, message: errorMessage };
        } else {        
            const errorMessage = 'Error updating payment: ' + error.message;
            return { success: false, message: errorMessage };
        }
    }
}

export const getPayment = async (group_reference_id, payment_reference_id) => {
    try {
        const authToken = localStorage.getItem('authToken');

        const response = await axios.get(
            `${BASE_URL}v1/groups/${group_reference_id}/payments/${payment_reference_id}?include=contributors,participants,group`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching payment: ', error);
    }
}

export const getAllPayments = async (group_reference_id) => {
    try {
        const authToken = localStorage.getItem('authToken');

        const response = await axios.get(
            `${BASE_URL}v1/groups/${group_reference_id}/payments`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching payments: ', error);
    }
}

export const deletePayment = async (group_reference_id, payment_reference_id) => {
    try {
        const authToken = localStorage.getItem('authToken');

        const response = await axios.delete(
            `${BASE_URL}v1/groups/${group_reference_id}/payments/${payment_reference_id}`,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return { success: true, message: "Payment deleted." };
    } catch (error) {
        const errorMessage = 'Error deleting payment: ' + error.message;
        return { success: false, message: errorMessage };
    }
}

export const addOrRemoveMembers = async (group_reference_id, member_ids = [], action = 'add') => {
    try {
        const authToken = localStorage.getItem('authToken');

        const post_action = action == 'add' ? 'add-members' : 'remove-members';

        const form = {
            "data": {
                "attributes": {
                    "member_ids": member_ids
                }
            }
        }   

        const response = await axios.post(
            `${BASE_URL}v1/groups/${group_reference_id}/${post_action}`,
            form,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return { success: true, message: 'Success' };

    } catch (error) {
        const errorMessage = 'Error managing members: ' + error.message;
        return { success: false, message: errorMessage };
    }
}

export const joinGroup = async (group_reference_id) => {
    try {
        const authToken = localStorage.getItem('authToken');

        const form = {
            "group_reference_id": group_reference_id
        }   

        const response = await axios.post(
            `${BASE_URL}v1/users/join-group`,
            form,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        )

        return { success: true, message: 'You have joined the group.' };

    } catch (error) {       
        const errorMessage = 'Error joining group: ' + error.message;
        return { success: false, message: errorMessage };
    }
}

export const leaveGroup = async (group_reference_id) => {
    try {
        const authToken = localStorage.getItem('authToken');

        const form = {
            "group_reference_id": group_reference_id
        }   

        const response = await axios.post(
            `${BASE_URL}v1/users/leave-group`,
            form,
            {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        )

        return { success: true, message: 'You have left the group.' };

    } catch (error) {       
        const errorMessage = 'Error leaving group: ' + error.message;
        return { success: false, message: errorMessage };
    }
}