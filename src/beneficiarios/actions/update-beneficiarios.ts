'use server'
import { revalidatePath } from "next/cache";
import { BeneficiarioColaboradorValues } from "../interfaces/BeneficiariosColaboradorSheet";

export const updateBeneficiario = async (payload: BeneficiarioColaboradorValues) => {
    console.log(payload)
    const { personId, ...body } = payload;

    try {
        const response = await fetch(process.env.API_URL + `/beneficiarios/${personId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...body }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error updating beneficiario:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo actualizar el beneficiario',
            };
        }

        revalidatePath('/dashboard/beneficiarios');

        return {
            ok: true,
            message: 'Datos de beneficiario actualizados correctamente',
        };
    } catch (error) {
        console.error('Error fetching beneficiarios:', error);
        return {
            ok: false,
            message: 'No se pudo actualizar los datos del beneficiario',
        };
    }
}
