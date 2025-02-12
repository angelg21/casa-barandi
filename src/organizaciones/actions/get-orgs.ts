'use server'

export const getAllOrgs = async () => {
    try {

        const response = await fetch(process.env.API_URL + '/organizaciones', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al obtener las organizaciones',
            };
        }

        const data = await response.json();

        return {
            ok: true,
            data,
        };
    } catch (error) {
        console.error('Error fetching orgs:', error);
        return {
            ok: false,
            message: 'Error al obtener las organizaciones',
        };
    }
};