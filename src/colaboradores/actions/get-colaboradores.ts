'use server'

export const getAllColaboradores = async () => {
    try {

        const response = await fetch(process.env.API_URL + '/colaboradores', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al obtener los Colaboradores',
            };
        }

        const data = await response.json();

        return {
            ok: true,
            data,
        };
    } catch (error) {
        console.error('Error fetching Colaborador:', error);
        return {
            ok: false,
            message: 'Error al obtener los Colaborador',
        };
    }
};