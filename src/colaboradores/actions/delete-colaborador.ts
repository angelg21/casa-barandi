'use server'

import { revalidatePath } from "next/cache";

export const deleteColaborador = async (colaboradorId: string | undefined) => {
    try {
        
        const response = await fetch(process.env.API_URL + `/colaboradores/${colaboradorId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("Respuesta: ", response)

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al eliminar el Colaborador',
            };
        }

        revalidatePath('/dashboard/colaboradores');

        return {
            ok: true,
        };
    } catch (error) {
        console.error('Error fetching Colaborador:', error);
        return {
            ok: false,
            message: 'Error al eliminar el Colaborador',
        };
    }
};