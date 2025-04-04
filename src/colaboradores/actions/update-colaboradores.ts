'use server'
import { BeneficiarioColaboradorValues } from "@/src/beneficiarios/interfaces/BeneficiariosColaboradorSheet";
import { revalidatePath } from "next/cache";

export const updateColaborador = async (payload: BeneficiarioColaboradorValues) => {
    console.log(payload)
    const { personId, ...body } = payload;

    try {
        const response = await fetch(process.env.API_URL + `/colaboradores/${personId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...body }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error updating colaborador:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo actualizar el colaborador',
            };
        }

        revalidatePath('/dashboard/colaboradores');

        return {
            ok: true,
            message: 'Datos de colaborador actualizados correctamente',
        };
    } catch (error) {
        console.error('Error fetching colaboradores:', error);
        return {
            ok: false,
            message: 'No se pudo actualizar los datos del colaborador',
        };
    }
}
