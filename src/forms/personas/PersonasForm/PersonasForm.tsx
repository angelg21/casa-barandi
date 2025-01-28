'use client'

import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { InputWithLabel } from "../../components/InputWithLabel";
import { PersonaFormValues } from "../interfaces/PersonasForm";
import { CheckTypeGender } from "../../components/CheckTypeGender";
import { SelectDate } from "../../components/SelectDate";
import { DocumentsInput } from "../../components/DocumentsInput";
import { EmailAddressesInput } from "../../components/EmailAddressesInput";
import { PhonesInput } from "../../components/PhonesInput";
import { ExpandableInput } from "../../components/ExpandableInput";
import { HistoryIllnessInput } from "../../components/HistoryIllnessInput";
import { ButtonComponent } from "@/src/components/Button";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";

interface ModalProps {
    onClose?: () => void;

}

export default function PersonasForm({ onClose }: ModalProps) {

    const { id } = useParams();
    const pathname = usePathname();
    const [personaInitialValue, setPersonaInitialValue] = useState<PersonaFormValues>()
    const [isLoading, setIsLoading] = useState(true);

    // Array de palabras para verificar
    const wordsToCheck = ['editar', 'personas'];

    // Verifica si el pathname termina con alguna de las palabras
    const isEditPage = wordsToCheck.some((word) => pathname.endsWith(word));

    console.log('Ruta completa', pathname)
    useEffect(() => {
        const fetchPersonaData = async () => {
            setIsLoading(true);
            try {
                //const response = await getPersonaForm(id);
                //const { _id, ...initialValues } = response?.responseData;
                setPersonaInitialValue(initialValues);
                console.log(initialValues)
            } catch (error) {
                console.error('Error fetching author data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPersonaData();
    }, [id]);

    const initialValues = JSON.parse(JSON.stringify({
        fullName: '',
        gender: '',
        dateOfBirth: '',
        bloodType: '',
        educationLevel: '',
        community: '',
        documents: [],
        electronicAddresses: [],
        phones: [],
        location: { houseAddress: '', parish: '', municipaly: '' },
        historyIllness: [],
        descriptionAllergies: ''
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


    // const FormDebug = () => {
    //     const { values } = useFormikContext();
    //     return (
    //         <pre className="mt-4 bg-gray-100 p-2">
    //             {JSON.stringify(values, null, 2)}
    //         </pre>
    //     );
    // };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-d-fondo">
                <div className="flex flex-col items-center space-y-2">
                    {/* Spinner */}
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cb-green"></div>
                    {/* Texto de carga */}
                    <p className="text-lg font-semibold text-gray-700 tracking-wide">
                        Cargando...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <Formik<PersonaFormValues>
            initialValues={personaInitialValue || initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => console.log(values)}
        >
            {() => {
                return (
                    <Form>
                        {/* <SaveFormValues /> */}
                        <div className=''>
                            <div className='flex flex-col mx-5 lg:mx-9'>
                                <div className="h-calc(100vh) overflow-y-auto space-y-10 mb-14 px-1">
                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                        <InputWithLabel
                                            id="fullName"
                                            name={"fullName"}
                                            type={"text"}
                                            label={"Nombre Completo"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-1"}
                                        />
                                        <CheckTypeGender
                                            name={"gender"}
                                            globalStyle={"col-span-1"}
                                        />
                                        <SelectDate
                                            name={"dateOfBirth"}
                                            title="Fecha de nacimiento"
                                            globalStyle={"col-span-1"}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                        <InputWithLabel
                                            id="bloodType"
                                            name={"bloodType"}
                                            type={"text"}
                                            label={"Tipo de Sangre"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-1"}
                                        />
                                        <InputWithLabel
                                            id="educationLevel"
                                            name={"educationLevel"}
                                            type={"text"}
                                            label={"Grado de Instrucción"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-2"}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1">
                                        <InputWithLabel
                                            id="community"
                                            name={"community"}
                                            type={"text"}
                                            label={"Comunidad"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 "}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                        <DocumentsInput
                                            globalStyle={"col-span-1"}
                                        />
                                        <PhonesInput
                                            globalStyle={"col-span-1"}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8 ">
                                        <EmailAddressesInput
                                            globalStyle={"col-span-1"}
                                        />
                                        <div className="col-span-1 space-y-8">
                                            <InputWithLabel
                                                id="municipaly"
                                                name={"location.municipaly"}
                                                type={"text"}
                                                label={"Municipio"}
                                                labelTextStyle={"text-gray-900 text-sm"}
                                                inputWidth={"w-full "}
                                                focusBorderColor={"focus:ring-[#08A49C]"}
                                                globalStyle={"col-span-1 "}
                                            />
                                            <InputWithLabel
                                                id="parish"
                                                name={"location.parish"}
                                                type={"text"}
                                                label={"Parroquia"}
                                                labelTextStyle={"text-gray-900 text-sm"}
                                                inputWidth={"w-full "}
                                                focusBorderColor={"focus:ring-[#08A49C]"}
                                                globalStyle={"col-span-1 "}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1">
                                        <ExpandableInput
                                            id="houseAddress"
                                            name={"location.houseAddress"}
                                            type={"text"}
                                            label={"Dirección"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-3"}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8 ">
                                        <HistoryIllnessInput
                                            globalStyle={"col-span-1 md:col-span-2"}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1  ">
                                        <span>
                                            Alergias
                                        </span>
                                        <ExpandableInput
                                            id="descriptionAllergies"
                                            name={"descriptionAllergies"}
                                            type={"text"}
                                            label={"Descripción"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1"}
                                        />
                                    </div>
                                    <div className="flex justify-end mt-64 gap-5">
                                        {!id &&
                                            <ButtonComponent
                                                bgColor="bg-d-red"
                                                text="Cancelar"
                                                width="w-[100px]"
                                                fontSize="text-sm"
                                                type='button'
                                                isDisabled={false}
                                                onClick={onClose}
                                                hoverColor="#a51c30"
                                            />
                                        }
                                        {isEditPage &&
                                            <ButtonComponent
                                                bgColor="bg-cb-green"
                                                text="Guardar"
                                                width="w-[100px]"
                                                fontSize="text-sm"
                                                type='button'
                                                isDisabled={false}
                                                //onClick={handleSave}
                                                hoverColor="#33B7B0"
                                            />
                                        }
                                    </div>
                                    {/* <div >
                                        <FormDebug />
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}