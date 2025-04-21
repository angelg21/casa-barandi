'use server'
import { revalidatePath } from "next/cache";
import { Servicio } from "../interfaces/Servicio";



export const updateServicio = async (payload: Servicio) => {
    const { id, ...body } = payload;

    try {
        const response = await fetch(process.env.API_URL + `/workshop/servicios/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...body }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error updating servicio:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo actualizar el servicio',
            };
        }

        revalidatePath('/dashboard/servicios');

        return {
            ok: true,
            message: 'Datos de servicio actualizados correctamente',
        };
    } catch (error) {
        console.error('Error fetching servicio:', error);
        return {
            ok: false,
            message: 'No se pudo actualizar los datos del servicio',
        };
    }
}
