'use server'
import { revalidatePath } from "next/cache";
import { AliadoValues } from "../interfaces/AliadosSheet";

export const updateAllie = async (payload: AliadoValues) => {
    const { id, ...body } = payload;

    try {
        const response = await fetch(process.env.API_URL + `/aliados/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...body }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error creating allie:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo actualizar el aliado',
            };
        }

        revalidatePath('/dashboard/aliado');

        return {
            ok: true,
            message: 'Datos de aliado actualizados correctamente',
        };
    } catch (error) {
        console.error('Error fetching allies:', error);
        return {
            ok: false,
            message: 'No se pudo actualizar los datos del aliado',
        };
    }
}
