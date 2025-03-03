class Api {
    constructor() {
        this.baseUrl = window.INITIAL_DATA.apiUrl;
        this.token = localStorage.getItem('token');
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('token', token);
    }

    clearToken() {
        this.token = null;
        localStorage.removeItem('token');
    }

    async request(endpoint, options = {}) {
        const url = this.baseUrl + endpoint;
        const headers = {
            'Content-Type': 'application/json',
            ...(this.token && { 'Authorization': `Bearer ${this.token}` }),
            ...options.headers
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || 'An error occurred');
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Auth endpoints
    async login(email, password) {
        const data = await this.request('auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
        this.setToken(data.access_token);
        return data;
    }

    async register(userData) {
        return await this.request('auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async getCurrentUser() {
        return await this.request('auth/me');
    }

    // Provider endpoints
    async getProviders() {
        return await this.request('api/providers');
    }

    async getProvider(id) {
        return await this.request(`api/providers/${id}`);
    }

    async createProvider(data) {
        return await this.request('api/providers', {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }

    async updateProvider(id, data) {
        return await this.request(`api/providers/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }

    // Message endpoints
    async getMessages() {
        return await this.request('api/messages');
    }

    async sendMessage(receiverId, content) {
        return await this.request('api/messages', {
            method: 'POST',
            body: JSON.stringify({ receiver_id: receiverId, content })
        });
    }

    // Review endpoints
    async getProviderReviews(providerId) {
        return await this.request(`api/providers/${providerId}/reviews`);
    }

    async createReview(providerId, data) {
        return await this.request(`api/providers/${providerId}/reviews`, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}

// Create a single instance to use throughout the app
window.api = new Api();
