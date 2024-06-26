import React, { createContext, useContext, useReducer } from 'react';
import { EventProvider } from './EventContext';


// Creamos el contexto
const EventContext = createContext();

// Definimos el proveedor del contexto
export const EventProvider = ({ children }) => {
    const initialState = {
        events: [], // Aquí puedes inicializar el estado de los eventos como un array vacío
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case 'ADD_EVENT':
                return {
                    ...state,
                    events: [...state.events, action.payload],
                };
            case 'DELETE_EVENT':
                return {
                    ...state,
                    events: state.events.filter((event) => event.id !== action.payload),
                };
            // Agrega más casos según sea necesario para editar, obtener eventos, etc.
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <EventContext.Provider value={{ state, dispatch }}>
            {children}
        </EventContext.Provider>
    );
};

// Creamos un hook personalizado para usar el contexto más fácilmente en otros componentes
export const useEventContext = () => useContext(EventContext);
