'use client'
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { InputWithLabel } from "../../../forms/components/InputWithLabel";
import { PersonaFormValues } from "../../../forms/personas/interfaces/PersonasForm";
import { SelectDate } from "../../../forms/components/SelectDate";
import { ButtonComponent } from "@/src/components/Button";
import { useState } from "react";
import { AliadoValues } from "@/src/aliados/interfaces/AliadosSheet";
import { Programa } from "../../interfaces/Programa";
import { ColaboradorValues } from "@/src/colaboradores/interfaces/ColaboradoresSheet";
import { SelectAliadosInput } from "../SelectAliadosInput/SelectAliadosInput";
import { SelectColaboradoresInput } from "../SelectColaboradoresInput/SelectColaboradoresInput";


interface ModalProps {
    onClose: () => void;
    editValues?: Programa;
    aliados?: AliadoValues[];
    colaboradores?: ColaboradorValues[];
}

export default function ProgramaForm({ onClose, editValues, aliados, colaboradores }: ModalProps) {

    const [showRepresentativeForm, setShowRepresentativeForm] = useState(false);
    const [showOrganizationForm, setShowOrganizationForm] = useState(false);

    const initialValues = editValues ? JSON.parse(JSON.stringify({ ...editValues })) :
        JSON.parse(JSON.stringify({
            description: '',
            dateStart: '',
            timeStart: '',
            timeEnd: '',
            peopleLimit: 0,
            community: '',
            aliados: [],
            colaboradores: [],
        }));

    const validationSchema = Yup.object({
        fullName: Yup.string()
            .max(100, 'El nombre no puede superar los 100 caracteres')
            .required('El nombre es obligatorio'),

        // age: Yup.number()
        //     .min(18, 'Debe tener al menos 18 años')
        //     .max(120, 'La edad no puede ser mayor a 120 años')
        //     .nullable()
        //     .required('La edad es obligatoria'),

        // gender: Yup.string()
        //     .oneOf(['male', 'female', 'other'], 'Género inválido')
        //     .nullable()
        //     .required('El género es obligatorio'),

        // email: Yup.string()
        //     .email('Debe ser un correo electrónico válido')
        //     .required('El correo electrónico es obligatorio'),

        // phoneNumber: Yup.string()
        //     .max(15, 'El número de teléfono no puede superar los 15 caracteres')
        //     .required('El número de teléfono es obligatorio'),

        // address: Yup.string()
        //     .max(100, 'La dirección no puede superar los 100 caracteres')
        //     .nullable(),

        // experience: Yup.string()
        //     .max(300, 'La experiencia no puede superar los 300 caracteres')
        //     .nullable(),

        // skills: Yup.array()
        //     .of(Yup.string().max(50, 'Cada habilidad no puede superar los 50 caracteres'))
        //     .nullable(),

        // areasOfInterest: Yup.array()
        //     .of(Yup.string().max(50, 'Cada área de interés no puede superar los 50 caracteres'))
        //     .required('Debe seleccionar al menos un área de interés'),

        // availability: Yup.object({
        //     days: Yup.array()
        //         .of(Yup.string().oneOf(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], 'Día inválido'))
        //         .min(1, 'Debe seleccionar al menos un día de disponibilidad')
        //         .required('La disponibilidad de días es obligatoria'),
        //     hours: Yup.string()
        //         .oneOf(['Morning', 'Afternoon', 'Full Day'], 'Horario inválido')
        //         .required('El horario es obligatorio'),
        // }).required(),

        // emergencyContact: Yup.object({
        //     name: Yup.string()
        //         .max(100, 'El nombre no puede superar los 100 caracteres')
        //         .required('El nombre de contacto de emergencia es obligatorio'),
        //     phoneNumber: Yup.string()
        //         .max(15, 'El número de teléfono no puede superar los 15 caracteres')
        //         .required('El número de teléfono de contacto de emergencia es obligatorio'),
        //     relationship: Yup.string()
        //         .max(50, 'La relación no puede superar los 50 caracteres')
        //         .nullable()
        //         .required('La relación es obligatoria'),
        // }).required(),

        // additionalComments: Yup.string()
        //     .max(500, 'Los comentarios adicionales no pueden superar los 500 caracteres')
        //     .nullable(),

        // acceptsTerms: Yup.boolean()
        //     .oneOf([true], 'Debe aceptar los términos y condiciones')
        //     .required('Debe aceptar los términos y condiciones'),
    });

    const handleSubmit = async (values: Programa) => {
        // const response = editValues ? await updatePerson(values) : await createPerson(values);
        // console.log(response)
        // if (response.ok) {
        //     onClose();
        // }
        // console.log("Entro")
    }

    const handleRejectTogglePerson = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowRepresentativeForm(e.target.checked); // Muestra o esconde el campo de observación
    };

    const handleRejectToggleOrganization = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowOrganizationForm(e.target.checked); // Muestra o esconde el campo de observación
    };

    // const FormDebug = () => {
    //     const { values } = useFormikContext();
    //     return (
    //         <pre className="mt-4 bg-gray-100 p-2">
    //             {JSON.stringify(values, null, 2)}
    //         </pre>
    //     );
    // };

    return (
        <Formik<PersonaFormValues>
            initialValues={initialValues}
            validationSchema={validationSchema} 
            // onSubmit={(values) => console.log(values)}
            onSubmit={handleSubmit}
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
                                            id="description"
                                            name={"description"}
                                            type={"text"}
                                            label={"Descripción"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-1"}
                                        />
                                        <SelectDate
                                            name={"dateOfBirth"}
                                            title="Fecha de Inicio"
                                            globalStyle={"col-span-1"}
                                        />
                                        <InputWithLabel
                                            id="timeStart"
                                            name={"timeStart"}
                                            type={"text"}
                                            label={"Hora de Inicio"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-1"}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                        <InputWithLabel
                                            id="timeEnd"
                                            name={"timeEnd"}
                                            type={"text"}
                                            label={"Hora de Cierre"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-1"}
                                        />
                                        <InputWithLabel
                                            id="peopleLimit"
                                            name={"peopleLimit"}
                                            type={"number"}
                                            label={"Limite de Personas"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-1"}
                                        />
                                        <InputWithLabel
                                            id="community"
                                            name={"community"}
                                            type={"text"}
                                            label={"Comunidad"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-1"}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                        <SelectAliadosInput 
                                            globalStyle={"col-span-1 md:col-span-3"}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                        <SelectColaboradoresInput 
                                            globalStyle={"col-span-1 md:col-span-3"}
                                        />
                                    </div>

                                    
                                    <div className="flex justify-end mt-64 gap-5">
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
                                        <ButtonComponent
                                            bgColor="bg-cb-green"
                                            text="Guardar"
                                            width="w-[100px]"
                                            fontSize="text-sm"
                                            type='submit'
                                            isDisabled={false}
                                            //onClick={handleSave}
                                            hoverColor="#33B7B0"
                                        />
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