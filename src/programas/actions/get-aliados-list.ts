'use server'

export const getAllAlliesNames = async () => {
    try {
        const response = await fetch(process.env.API_URL + '/aliados/minimal', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al obtener los aliados',
            };
        }

        const data = await response.json();

        return {
            ok: true,
            data,
        };
    } catch (error) {
        console.error('Error fetching allies:', error);
        return {
            ok: false,
            message: 'Error al obtener los aliados',
        };
    }
};