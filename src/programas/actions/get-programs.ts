'use server'

export const getAllPrograms = async () => {
    try {

        const response = await fetch(process.env.API_URL + '/workshop', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al obtener los programas',
            };
        }

        const data = await response.json();

        return {
            ok: true,
            data,
        };
    } catch (error) {
        console.error('Error fetching programs:', error);
        return {
            ok: false,
            message: 'Error al obtener los programas',
        };
    }
};