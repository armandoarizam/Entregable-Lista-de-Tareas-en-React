import React, { useState, useEffect, useReducer, useContext } from 'react'; // Importamos los hooks necesarios de React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { EventProvider } from './EventContext'; // Importamos el proveedor de contexto
import CreateEvent from './components/CreateEvent';
import EventList from './components/EventList';
import EventDetails from './components/EventDetails';
import HomePage from './components/HomePage';

// Crear un contexto global utilizando useContext
const AppContext = createContext();

// Crear la función reducer para administrar el estado con los eventos
function reducer(state, action) {
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
        // Agregar más casos según sea necesario para obtener eventos, editar, etc.
        default:
            return state;
    }
}

// Crear un componente reutilizable, por ejemplo, un botón personalizado
const Button = ({ onClick, children }) => {
    return <button onClick={onClick}>{children}</button>;
};

// Utilizar componentes estilizados para la estilización de los componentes
const StyledComponent = () => {
    return <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>Styled Component</div>;
};

function App() {
    const [state, dispatch] = useReducer(reducer, { events: [] }); // Implementar useReducer para manejar el estado de eventos

    useEffect(() => {
        // Implementar useEffect para manejar el ciclo de vida del componente y guardar/obtener los eventos del localStorage
        const storedEvents = JSON.parse(localStorage.getItem('events'));
        if (storedEvents) {
            dispatch({ type: 'ADD_EVENT', payload: storedEvents });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(state.events));
    }, [state.events]);

    return (
        <ChakraProvider>
            <Router>
                <Routes>
                    {/* Configurar rutas estáticas y dinámicas utilizando Route */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/event-list" element={<EventList />} />
                    <Route path="/event-details/:id" element={<EventDetails />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
