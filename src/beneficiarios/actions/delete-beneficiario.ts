'use server'

import { revalidatePath } from "next/cache";

export const deleteBeneficiario = async (beneficiarioId: string | undefined) => {
    try {
        
        const response = await fetch(process.env.API_URL + `/beneficiarios/${beneficiarioId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log("Respuesta: ", response)

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al eliminar el Beneficiario',
            };
        }

        revalidatePath('/dashboard/beneficiarios');

        return {
            ok: true,
        };
    } catch (error) {
        console.error('Error fetching Beneficiario:', error);
        return {
            ok: false,
            message: 'Error al eliminar el Beneficiario',
        };
    }
};