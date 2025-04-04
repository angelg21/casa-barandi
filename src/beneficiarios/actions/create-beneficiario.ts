'use server'
import { revalidatePath } from "next/cache";
import { BeneficiarioColaboradorValues } from "../interfaces/BeneficiariosColaboradorSheet";

export const createBeneficiario = async (payload: BeneficiarioColaboradorValues) => {

    try {
        const response = await fetch(process.env.API_URL + `/beneficiarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...payload }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error creating beneficario:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo crear el beneficiario',
            };
        }

        revalidatePath('/dashboard/beneficiarios');

        return {
            ok: true,
            message: 'Beneficiario creada correctamente',
        };
    } catch (error) {
        console.error('Error fetching beneficiario:', error);
        return {
            ok: false,
            message: 'No se pudo crear el Beneficiario',
        };
    }
}
