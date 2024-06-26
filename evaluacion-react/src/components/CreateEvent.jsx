const CreateEvent = () => {
    const { dispatch } = useEventContext();
    const [reservation, setReservation] = useState({
        id: '',
        name: '',
        date: '',
        place: '',
        numberOfPeople: 0,
        theme: '',
    });

    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReservation((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (reservation.numberOfPeople <= 0) {
            setFormErrors((prevErrors) => ({
                ...prevErrors,
                numberOfPeople: 'La cantidad de participantes debe ser mayor a 0',
            }));
        } else {
            dispatch({ type: 'ADD_EVENT', payload: reservation });
            console.log(reservation);
            setReservation({
                id: '',
                name: '',
                date: '',
                place: '',
                numberOfPeople: 0,
                theme: '',
            });
        }
    };

    return (
        <div>
            <h1>Create Event Form</h1>
            <form onSubmit={handleSubmit}>
                <FormControl isInvalid={!!formErrors.numberOfPeople}>
                    <FormLabel>Número de participantes</FormLabel>
                    <Input
                        type="number"
                        name="numberOfPeople"
                        value={reservation.numberOfPeople}
                        onChange={handleInputChange}
                    />
                    <FormErrorMessage>{formErrors.numberOfPeople}</FormErrorMessage>
                </FormControl>
                {/* Campos adicionales del formulario */}
                <FormControl>
                    <FormLabel>Nombre del evento</FormLabel>
                    <Input
                        type="text"
                        name="name"
                        value={reservation.name}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Fecha del evento</FormLabel>
                    <Input
                        type="date"
                        name="date"
                        value={reservation.date}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Lugar del evento</FormLabel>
                    <Input
                        type="text"
                        name="place"
                        value={reservation.place}
                        onChange={handleInputChange}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Tema del evento</FormLabel>
                    <Input
                        type="text"
                        name="theme"
                        value={reservation.theme}
                        onChange={handleInputChange}
                    />
                </FormControl>
                {/* Agregar más campos según sea necesario */}
                <Button type="submit">Crear Evento</Button>
            </form>
        </div>
    );
};
