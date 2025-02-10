'use server'
import { revalidatePath } from "next/cache";
import { Persona } from "../interfaces/Persona";

export const createPerson = async (payload: Persona) => {

    try {
        const response = await fetch(process.env.API_URL + `/persons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...payload }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error creating person:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo crear la persona',
            };
        }

        revalidatePath('/dashboard/personas');

        return {
            ok: true,
            message: 'Persona creada correctamente',
        };
    } catch (error) {
        console.error('Error fetching persons:', error);
        return {
            ok: false,
            message: 'No se pudo crear la persona',
        };
    }
}
