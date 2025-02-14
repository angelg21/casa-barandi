'use server'
import { revalidatePath } from "next/cache";
import { AliadoValues } from "../interfaces/AliadosSheet";

export const createAllie = async (payload: AliadoValues) => {

    try {
        const response = await fetch(process.env.API_URL + `/aliados`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...payload }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error creating allie:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo crear el aliado',
            };
        }

        revalidatePath('/dashboard/aliados');

        return {
            ok: true,
            message: 'Aliado creada correctamente',
        };
    } catch (error) {
        console.error('Error fetching allies:', error);
        return {
            ok: false,
            message: 'No se pudo crear el aliado',
        };
    }
}
