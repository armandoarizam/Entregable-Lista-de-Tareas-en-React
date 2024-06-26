import React from 'react';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
    const { id } = useParams();

    // Aquí puedes obtener los detalles del evento con el ID y mostrarlos en un formulario para editar
    return <div>Details of Event {id}</div>;
};

export default EventDetails;
