'use server'

import { revalidatePath } from "next/cache";

export const deletePerson = async (personId: string | undefined) => {
    try {
        
        const response = await fetch(process.env.API_URL + `/persons/${personId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("Respuesta: ", response)

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al eliminar el usuario',
            };
        }

        revalidatePath('/dashboard/personas');

        return {
            ok: true,
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            ok: false,
            message: 'Error al eliminar el usuario',
        };
    }
};