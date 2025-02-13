'use server'
import { revalidatePath } from "next/cache";
import { Organizacion } from "../interfaces/Organizacion";

export const createOrg = async (payload: Organizacion) => {

    try {
        const response = await fetch(process.env.API_URL + `/organizaciones`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...payload }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error creating org:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo crear la organizacion',
            };
        }

        revalidatePath('/dashboard/organizaciones');

        return {
            ok: true,
            message: 'Organización creada correctamente',
        };
    } catch (error) {
        console.error('Error fetching orgs:', error);
        return {
            ok: false,
            message: 'No se pudo crear la organización',
        };
    }
}
