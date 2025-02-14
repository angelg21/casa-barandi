'use server'
import { revalidatePath } from "next/cache";
import { Persona } from "../interfaces/Persona";

export const updatePerson = async (payload: Persona) => {
    const { id, ...body } = payload;

    try {
        const response = await fetch(process.env.API_URL + `/persons/${id}`, {
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
                message: responseData.message || 'No se pudo actualizar la persona',
            };
        }

        revalidatePath('/dashboard/personas');

        return {
            ok: true,
            message: 'Datos de persona actualizados correctamente',
        };
    } catch (error) {
        console.error('Error fetching person:', error);
        return {
            ok: false,
            message: 'No se pudo actualizar los datos de la persona',
        };
    }
}
