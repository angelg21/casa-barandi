'use client'
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from 'yup';
import { InputWithLabel } from "../../../forms/components/InputWithLabel";
import { PersonaFormValues } from "../../../forms/personas/interfaces/PersonasForm";
import { CheckTypeGender } from "../../../forms/components/CheckTypeGender";
import { SelectDate } from "../../../forms/components/SelectDate";
import { DocumentsInput } from "../../../forms/components/DocumentsInput";
import { EmailAddressesInput } from "../../../forms/components/EmailAddressesInput";
import { PhonesInput } from "../../../forms/components/PhonesInput";
import { ExpandableInput } from "../../../forms/components/ExpandableInput";
import { HistoryIllnessInput } from "../../../forms/components/HistoryIllnessInput";
import { ButtonComponent } from "@/src/components/Button";
import { createPerson } from "../../actions/create-person";
import { Persona } from "../../interfaces/Persona";
import { updatePerson } from "../../actions/update-person";
import { useState } from "react";
import { SelectPersonInput } from "@/src/colaboradores/components/SelectPersonInput/SelectPersonInput";
import { Company } from "@/src/aliados/interfaces/AliadosSheet";
import { Person } from "@/src/beneficiarios/interfaces/BeneficiariosColaboradorSheet";
import { SelectCompanyInput } from "@/src/aliados/components/SelectCompanyInput/SelectCompanyInput";


interface ModalProps {
    onClose: () => void;
    editValues?: Persona;
    personas: Person[];
    companies: Company[];
}

export default function PersonasForm({ onClose, editValues, personas, companies }: ModalProps) {

    const [showRepresentativeForm, setShowRepresentativeForm] = useState(false);
    const [showOrganizationForm, setShowOrganizationForm] = useState(false);

    const initialValues = editValues ? JSON.parse(JSON.stringify({ ...editValues })) :
        JSON.parse(JSON.stringify({
            fullName: '',
            gender: '',
            dateOfBirth: '',
            bloodType: '',
            educationLevel: '',
            community: '',
            documents: [],
            electronicAddresses: [],
            phones: [],
            location: {
                houseAddress: '', parish: '',
                municipality: ''
            },
            historyIllness: [],
            descriptionAllergies: '',
            organizationId: '',
            role: '',
            familyRepresentativeId: '',
            relationship: '',
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

    const handleSubmit = async (values: Persona) => {
        const response = editValues ? await updatePerson(values) : await createPerson(values);
        console.log(response)
        if (response.ok) {
            onClose();
        }
        console.log("Entro")
    }

    const handleRejectTogglePerson = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowRepresentativeForm(e.target.checked); // Muestra o esconde el campo de observación
    };

    const handleRejectToggleOrganization = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowOrganizationForm(e.target.checked); // Muestra o esconde el campo de observación
    };

    const FormDebug = () => {
        const { values } = useFormikContext();
        return (
            <pre className="mt-4 bg-gray-100 p-2">
                {JSON.stringify(values, null, 2)}
            </pre>
        );
    };

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
                                                id="municipality"
                                                name={"location.municipality"}
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
                                    <div className="col-span-1  md:col-span-4">
                                        <div className='mt-2'>
                                            <label className='flex items-center cursor-pointer'>
                                                <input
                                                    type="checkbox"
                                                    name="observationCheckbox"
                                                    className='h-5 w-5 text-cb-green border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-cb-green focus:ring-offset-1 transition duration-150 ease-in-out hover:ring-cb-green hover:ring-2 hover:ring-offset-2 mr-3'
                                                    checked={showRepresentativeForm}
                                                    onChange={handleRejectTogglePerson}
                                                />
                                                <span className='text-base font-medium text-gray-800 select-none transition duration-150 ease-in-out hover:text-d-blue'>
                                                    ¿ La persona tiene un representante ?
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    {
                                        showRepresentativeForm &&
                                        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                            <div className=" col-span-1">

                                                <SelectPersonInput
                                                    title="Seleccionar Persona"
                                                    people={personas}
                                                />
                                            </div>
                                            <InputWithLabel
                                                id="relationship"
                                                name={"relationship"}
                                                type={"text"}
                                                label={"Parentesco"}
                                                labelTextStyle={"text-gray-900 text-sm"}
                                                inputWidth={"w-full "}
                                                focusBorderColor={"focus:ring-[#08A49C]"}
                                                globalStyle={"col-span-2 md:col-span-2 "}
                                            />

                                        </div>
                                    }

                                    <div className="col-span-1  md:col-span-4">
                                        <div className='mt-2'>
                                            <label className='flex items-center cursor-pointer'>
                                                <input
                                                    type="checkbox"
                                                    name="observationCheckbox"
                                                    className='h-5 w-5 text-cb-green border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-cb-green focus:ring-offset-1 transition duration-150 ease-in-out hover:ring-cb-green hover:ring-2 hover:ring-offset-2 mr-3'
                                                    checked={showOrganizationForm}
                                                    onChange={handleRejectToggleOrganization}
                                                />
                                                <span className='text-base font-medium text-gray-800 select-none transition duration-150 ease-in-out hover:text-d-blue'>
                                                    ¿ La persona pertenece a una organización ?
                                                </span>
                                            </label>
                                        </div>
                                    </div>


                                    {
                                        showOrganizationForm &&
                                        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                            <div className=" col-span-1">

                                            <SelectCompanyInput<PersonaFormValues>
                                                title="Seleccionar Organización"
                                                companies={companies}
                                                idField="organizationId"
                                            />
                                            </div>
                                            <InputWithLabel
                                                id="role"
                                                name={"role"}
                                                type={"text"}
                                                label={"Rol"}
                                                labelTextStyle={"text-gray-900 text-sm"}
                                                inputWidth={"w-full "}
                                                focusBorderColor={"focus:ring-[#08A49C]"}
                                                globalStyle={"col-span-2 md:col-span-2 "}
                                            />

                                        </div>
                                    }
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
                                    <div >
                                        <FormDebug />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}