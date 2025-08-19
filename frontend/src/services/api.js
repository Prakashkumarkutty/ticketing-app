import axios from 'axios';

const API_BASE_URL = `${process.env.REACT_APP_API_URL}/api`

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const ticketAPI = {
    getAllTickets: () => api.get('/tickets'),

    createTicket: (ticketData) => api.post('/tickets', ticketData),

    updateTicket: (id, updateData) => api.put(`/tickets/${id}`, updateData)
}

export default api