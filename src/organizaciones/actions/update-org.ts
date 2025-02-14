'use server'
import { revalidatePath } from "next/cache";
import { Organizacion } from "../interfaces/Organizacion";

export const updateOrg = async (payload: Organizacion) => {
    const { id, ...body } = payload;

    try {
        const response = await fetch(process.env.API_URL + `/organizaciones/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...body }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error creating person:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo actualizar la org',
            };
        }

        revalidatePath('/dashboard/organizaciones');

        return {
            ok: true,
            message: 'Datos de organización actualizados correctamente',
        };
    } catch (error) {
        console.error('Error fetching org:', error);
        return {
            ok: false,
            message: 'No se pudo actualizar los datos de la organización',
        };
    }
}
