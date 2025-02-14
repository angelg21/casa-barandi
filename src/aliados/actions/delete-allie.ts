'use server'

import { revalidatePath } from "next/cache";

export const deleteAllie = async (allieId: string | undefined) => {
    try {
        
        const response = await fetch(process.env.API_URL + `/aliados/${allieId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("Respuesta: ", response)

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al eliminar el aliado',
            };
        }

        revalidatePath('/dashboard/aliados');

        return {
            ok: true,
        };
    } catch (error) {
        console.error('Error fetching allies:', error);
        return {
            ok: false,
            message: 'Error al eliminar el aliado',
        };
    }
};