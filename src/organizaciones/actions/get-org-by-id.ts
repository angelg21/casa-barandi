'use server'

export const getOrg = async (id: string) => {
    try {
        const response = await fetch(process.env.API_URL + `/organizaciones/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al obtener org',
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
            message: 'Error al obtener los datos de la org',
        };
    }
};