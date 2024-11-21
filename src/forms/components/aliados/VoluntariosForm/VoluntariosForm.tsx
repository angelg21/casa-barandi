'use client'

import { Form, Formik, useFormikContext } from "formik";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { useParams } from "next/navigation";
import { VoluntariosFormValues } from "../interfaces/VoluntariosForm";
import { InputWithLabel } from "../../form/InputWithLabel";

export default function VoluntariosForm() {

    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [voluntariosInitialValues, setVoluntariosInitialValues] = useState<VoluntariosFormValues>()

    // const SaveFormValues = () => {
    //     const { values } = useFormikContext<GroupingFormValues>();

    //     useEffect(() => {
    //         localStorage.setItem(`groupingFormData-${id}`, JSON.stringify(values));
    //     }, [values]);

    //     return null; // Este componente solo se utiliza para ejecutar el useEffect
    // };

    // useEffect(() => {
    //     const fetchGroupingData = async () => {
    //         setIsLoading(true);
    //         try {
    //             const response = await getGroupingForm(id);
    //             const { _id, ...initialValues } = response?.responseData;
    //             setGroupingInitialValue(initialValues);
    //             console.log(initialValues)
    //         } catch (error) {
    //             console.error('Error fetching author data:', error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     fetchGroupingData();
    // }, [id]);

    const initialValues = JSON.parse(JSON.stringify({
        fullName: '',
        age: null,
        gender: '',
        email: '',
        phoneNumber: '',
        address: '',
        experience: '',
        skills: [],
        areasOfInterest: [],
        availability: {
            days: [],
            hours: ''
        },
        emergencyContact: {
            name: '',
            phoneNumber: '',
            relationship: ''
        },
        additionalComments: '',
        acceptsTerms: false
    }));

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .max(100, 'El nombre no puede superar los 100 caracteres')
            .required('El nombre es obligatorio'),

        age: Yup.number()
            .min(18, 'Debe tener al menos 18 años')
            .max(120, 'La edad no puede ser mayor a 120 años')
            .nullable()
            .required('La edad es obligatoria'),

        gender: Yup.string()
            .oneOf(['male', 'female', 'other'], 'Género inválido')
            .nullable()
            .required('El género es obligatorio'),

        email: Yup.string()
            .email('Debe ser un correo electrónico válido')
            .required('El correo electrónico es obligatorio'),

        phoneNumber: Yup.string()
            .max(15, 'El número de teléfono no puede superar los 15 caracteres')
            .required('El número de teléfono es obligatorio'),

        address: Yup.string()
            .max(100, 'La dirección no puede superar los 100 caracteres')
            .nullable(),

        experience: Yup.string()
            .max(300, 'La experiencia no puede superar los 300 caracteres')
            .nullable(),

        skills: Yup.array()
            .of(Yup.string().max(50, 'Cada habilidad no puede superar los 50 caracteres'))
            .nullable(),

        areasOfInterest: Yup.array()
            .of(Yup.string().max(50, 'Cada área de interés no puede superar los 50 caracteres'))
            .required('Debe seleccionar al menos un área de interés'),

        availability: Yup.object({
            days: Yup.array()
                .of(Yup.string().oneOf(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 'Día inválido'))
                .min(1, 'Debe seleccionar al menos un día de disponibilidad')
                .required('La disponibilidad de días es obligatoria'),
            hours: Yup.string()
                .oneOf(['Morning', 'Afternoon', 'Full Day'], 'Horario inválido')
                .required('El horario es obligatorio'),
        }).required(),

        emergencyContact: Yup.object({
            name: Yup.string()
                .max(100, 'El nombre no puede superar los 100 caracteres')
                .required('El nombre de contacto de emergencia es obligatorio'),
            phoneNumber: Yup.string()
                .max(15, 'El número de teléfono no puede superar los 15 caracteres')
                .required('El número de teléfono de contacto de emergencia es obligatorio'),
            relationship: Yup.string()
                .max(50, 'La relación no puede superar los 50 caracteres')
                .nullable()
                .required('La relación es obligatoria'),
        }).required(),

        additionalComments: Yup.string()
            .max(500, 'Los comentarios adicionales no pueden superar los 500 caracteres')
            .nullable(),

        acceptsTerms: Yup.boolean()
            .oneOf([true], 'Debe aceptar los términos y condiciones')
            .required('Debe aceptar los términos y condiciones'),
    });


    const handleSubmitGroupingForm = (values: any) => {
        console.log('Formulario enviado:', values);
    };



    return (
        <Formik<VoluntariosFormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmitGroupingForm(values)}
        >
            {formik => {
                return (
                    <Form>
                        {/* <SaveFormValues /> */}
                        <div className=''>
                            <div className='flex flex-col mx-5 lg:mx-9 xl:mx-20'>
                                <div className="h-calc(100vh) overflow-y-auto mb-14 px-1">
                                    <InputWithLabel
                                        id="fullName"
                                        name={"fullName"}
                                        type={"text"}
                                        label={"Nombre de la agrupación"}
                                        labelTextStyle={"text-gray-900 text-sm"}
                                        inputWidth={"w-full "}
                                        focusBorderColor={"focus:ring-[#003366]"}
                                        globalStyle={"col-span-1 md:col-span-1"}
                                    />
                                    <InputWithLabel
                                        id="fullName"
                                        name={"fullName"}
                                        type={"text"}
                                        label={"Nombre de la agrupación"}
                                        labelTextStyle={"text-gray-900 text-sm"}
                                        inputWidth={"w-full "}
                                        focusBorderColor={"focus:ring-[#003366]"}
                                        globalStyle={"col-span-1 md:col-span-1"}
                                    />
                                    <InputWithLabel
                                        id="fullName"
                                        name={"fullName"}
                                        type={"text"}
                                        label={"Nombre de la agrupación"}
                                        labelTextStyle={"text-gray-900 text-sm"}
                                        inputWidth={"w-full "}
                                        focusBorderColor={"focus:ring-[#003366]"}
                                        globalStyle={"col-span-1 md:col-span-1"}
                                    />
                                    <InputWithLabel
                                        id="fullName"
                                        name={"fullName"}
                                        type={"text"}
                                        label={"Nombre de la agrupación"}
                                        labelTextStyle={"text-gray-900 text-sm"}
                                        inputWidth={"w-full "}
                                        focusBorderColor={"focus:ring-[#003366]"}
                                        globalStyle={"col-span-1 md:col-span-1"}
                                    />
                                    <InputWithLabel
                                        id="fullName"
                                        name={"fullName"}
                                        type={"text"}
                                        label={"Nombre de la agrupación"}
                                        labelTextStyle={"text-gray-900 text-sm"}
                                        inputWidth={"w-full "}
                                        focusBorderColor={"focus:ring-[#003366]"}
                                        globalStyle={"col-span-1 md:col-span-1"}
                                    />
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}