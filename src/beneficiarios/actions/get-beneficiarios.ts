'use server'

export const getAllBeneficiarios = async () => {
    try {

        const response = await fetch(process.env.API_URL + '/beneficiarios', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al obtener los Beneficiario',
            };
        }

        const data = await response.json();

        return {
            ok: true,
            data,
        };
    } catch (error) {
        console.error('Error fetching Beneficiario:', error);
        return {
            ok: false,
            message: 'Error al obtener los Beneficiario',
        };
    }
};