'use server'
import { BeneficiarioColaboradorValues } from "@/src/beneficiarios/interfaces/BeneficiariosColaboradorSheet";
import { revalidatePath } from "next/cache";

export const createColaborador = async (payload: BeneficiarioColaboradorValues) => {

    try {
        const response = await fetch(process.env.API_URL + `/colaboradores`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...payload }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error creating colaborador:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo crear el colaborador',
            };
        }

        revalidatePath('/dashboard/colaboradores');

        return {
            ok: true,
            message: 'Colaborador creada correctamente',
        };
    } catch (error) {
        console.error('Error fetching colaborador:', error);
        return {
            ok: false,
            message: 'No se pudo crear el Colaborador',
        };
    }
}
