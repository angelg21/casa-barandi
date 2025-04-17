'use server'

export const getAllServicesNames = async () => {
    try {
        const response = await fetch(process.env.API_URL + '/workshop/servicios/minimal', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al obtener los servicios',
            };
        }

        const data = await response.json();

        return {
            ok: true,
            data,
        };
    } catch (error) {
        console.error('Error fetching services:', error);
        return {
            ok: false,
            message: 'Error al obtener los servicios',
        };
    }
};