'use server'
import { revalidatePath } from "next/cache";
import { Servicio } from "../interfaces/Servicio";


export const createServicio = async (payload: Servicio) => {

    try {
        const response = await fetch(process.env.API_URL + `/workshop/servicios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...payload }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error creating servicio:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo crear el servicio',
            };
        }

        revalidatePath('/dashboard/servicios');

        return {
            ok: true,
            message: 'Servicio creado correctamente',
        };
    } catch (error) {
        console.error('Error fetching servicios:', error);
        return {
            ok: false,
            message: 'No se pudo crear el servicio',
        };
    }
}
