'use server'
import { revalidatePath } from "next/cache";
import { Programa } from "../interfaces/Programa";


export const updatePrograma = async (payload: Programa) => {
    const { id, ...body } = payload;

    try {
        const response = await fetch(process.env.API_URL + `/workshop/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...body }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error updating programa:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo actualizar el programa',
            };
        }

        revalidatePath('/dashboard/programas');

        return {
            ok: true,
            message: 'Datos de programa actualizados correctamente',
        };
    } catch (error) {
        console.error('Error fetching programa:', error);
        return {
            ok: false,
            message: 'No se pudo actualizar los datos del programa',
        };
    }
}
