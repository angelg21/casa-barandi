'use server'

import { revalidatePath } from "next/cache";

export const deleteServicio = async (servicioId: string | undefined) => {
    try {
        
        const response = await fetch(process.env.API_URL + `/service/${servicioId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al eliminar el servicio',
            };
        }

        revalidatePath('/dashboard/servicios');

        return {
            ok: true,
        };
    } catch (error) {
        console.error('Error fetching servicios:', error);
        return {
            ok: false,
            message: 'Error al eliminar el servicio',
        };
    }
};