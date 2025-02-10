'use server'

export const getPerson = async (id: string) => {
    try {
        const response = await fetch(process.env.API_URL + `/persons/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al obtener persona',
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
            message: 'Error al obtener los datos de la persona',
        };
    }
};