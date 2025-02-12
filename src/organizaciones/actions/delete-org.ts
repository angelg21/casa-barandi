'use server'

import { revalidatePath } from "next/cache";

export const deleteOrg = async (orgId: string | undefined) => {
    try {
        
        const response = await fetch(process.env.API_URL + `/organizaciones/${orgId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("Respuesta: ", response)

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al eliminar la Organizacion',
            };
        }

        revalidatePath('/dashboard/organizaciones');

        return {
            ok: true,
        };
    } catch (error) {
        console.error('Error fetching orgs:', error);
        return {
            ok: false,
            message: 'Error al eliminar la Organizacion',
        };
    }
};