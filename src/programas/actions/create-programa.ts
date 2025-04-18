'use server'
import { revalidatePath } from "next/cache";
import { Programa } from "../interfaces/Programa";

export const createPrograma = async (payload: Programa) => {

    try {
        const response = await fetch(process.env.API_URL + `/workshop`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...payload }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error creating programa:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo crear el programa',
            };
        }

        revalidatePath('/dashboard/programas');

        return {
            ok: true,
            message: 'Programa creado correctamente',
        };
    } catch (error) {
        console.error('Error fetching programas:', error);
        return {
            ok: false,
            message: 'No se pudo crear el programa',
        };
    }
}
