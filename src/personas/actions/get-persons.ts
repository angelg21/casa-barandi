'use server'

export const getAllPersons = async () => {
    try {

        const response = await fetch(process.env.API_URL + '/persons', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al obtener las personas',
            };
        }

        const data = await response.json();

        return {
            ok: true,
            data,
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            ok: false,
            message: 'Error al obtener los usuarios',
        };
    }
};