'use server'

export const getAllCollaboratorsNames = async () => {
    try {
        const response = await fetch(process.env.API_URL + '/colaboradores/minimal', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al obtener los colaboradores',
            };
        }

        const data = await response.json();

        return {
            ok: true,
            data,
        };
    } catch (error) {
        console.error('Error fetching collaborators:', error);
        return {
            ok: false,
            message: 'Error al obtener los colaboradores',
        };
    }
};