const API_URL = 'http://localhost:5000/api/auth';

// Helper function to handle API calls
const apiCall = async (endpoint, method = 'GET', data = null) => {
    try {
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // Add token to headers if it exists
        const token = getToken();
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }

        // Add body for POST requests
        if (data && (method === 'POST' || method === 'PUT')) {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(`${API_URL}${endpoint}`, options);
        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Something went wrong');
        }

        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// Register new user
export const register = async (userData) => {
    const result = await apiCall('/register', 'POST', userData);

    if (result.success && result.token) {
        saveToken(result.token);
        saveUser(result.user);
    }

    return result;
};

// Login user
export const login = async (email, password) => {
    const result = await apiCall('/login', 'POST', { email, password });

    if (result.success && result.token) {
        saveToken(result.token);
        saveUser(result.user);
    }

    return result;
};

// Logout user
export const logout = () => {
    localStorage.removeItem('gearguard_token');
    localStorage.removeItem('gearguard_user');
    window.location.href = '/';
};

// Get current user from server
export const getCurrentUserFromServer = async () => {
    try {
        const result = await apiCall('/me', 'GET');
        if (result.success && result.user) {
            saveUser(result.user);
            return result.user;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user:', error);
        logout();
        return null;
    }
};

// Token management
export const saveToken = (token) => {
    localStorage.setItem('gearguard_token', token);
};

export const getToken = () => {
    return localStorage.getItem('gearguard_token');
};

// User management
export const saveUser = (user) => {
    localStorage.setItem('gearguard_user', JSON.stringify(user));
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('gearguard_user');
    return userStr ? JSON.parse(userStr) : null;
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!getToken();
};

export default {
    register,
    login,
    logout,
    getCurrentUser,
    getCurrentUserFromServer,
    isAuthenticated,
    getToken,
};
