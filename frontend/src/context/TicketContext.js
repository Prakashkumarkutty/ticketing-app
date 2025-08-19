import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { ticketAPI } from '../services/api';

const TicketContext = createContext();

const initialState = {
    tickets: [],
    loading: false,
    error: null,
    user: null
};

function ticketReducer(state, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'SET_TICKETS':
            return { ...state, tickets: action.payload, loading: false, error: null };
        case 'ADD_TICKET':
            return { ...state, tickets: [action.payload, ...state.tickets] };
        case 'UPDATE_TICKET':
            return {
                ...state,
                tickets: state.tickets.map(ticket =>
                    ticket.id === action.payload.id ? action.payload : ticket
                )
            };
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        default:
            return state;
    }
}

export function TicketProvider({ children }) {
    const [state, dispatch] = useReducer(ticketReducer, initialState);

    const fetchTickets = useCallback(async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const response = await ticketAPI.getAllTickets();
            dispatch({ type: 'SET_TICKETS', payload: response.data.tickets });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    }, [dispatch]);

    const createTicket = async (ticketData) => {
        try {
            const response = await ticketAPI.createTicket(ticketData);
            dispatch({ type: 'ADD_TICKET', payload: response.data.ticket });
            return response.data.ticket;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    };

    const updateTicket = async (id, updateData) => {
        try {
            const response = await ticketAPI.updateTicket(id, updateData);
            dispatch({ type: 'UPDATE_TICKET', payload: response.data.ticket });
            return response.data.ticket;
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
            throw error;
        }
    };

    const login = (userData) => {
        dispatch({ type: 'LOGIN', payload: userData });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    useEffect(() => {
        if (state.user) {
            fetchTickets();
        }
    }, [state.user, fetchTickets]);

    return (
        <TicketContext.Provider value={{
            ...state,
            fetchTickets,
            createTicket,
            updateTicket,
            login,
            logout
        }}>
            {children}
        </TicketContext.Provider>
    );
}

export const useTickets = () => {
    const context = useContext(TicketContext);
    if (!context) {
        throw new Error('useTickets must be used within a TicketProvider');
    }
    return context;
};