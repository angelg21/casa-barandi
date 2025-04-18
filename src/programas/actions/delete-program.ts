'use server'

import { revalidatePath } from "next/cache";

export const deleteProgram = async (programId: string | undefined) => {
    try {
        
        const response = await fetch(process.env.API_URL + `/workshop/${programId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al eliminar el programa',
            };
        }

        revalidatePath('/dashboard/programas');

        return {
            ok: true,
        };
    } catch (error) {
        console.error('Error fetching programs:', error);
        return {
            ok: false,
            message: 'Error al eliminar el programa',
        };
    }
};