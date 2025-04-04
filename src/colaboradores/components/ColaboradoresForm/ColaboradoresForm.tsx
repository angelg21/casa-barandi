

import React, { useState } from 'react'
import { Form, Formik, useFormikContext } from 'formik';
import { InputWithLabel } from '@/src/forms/components/InputWithLabel';
import { SelectDate } from '@/src/forms/components/SelectDate';
import { ButtonComponent } from '@/src/components/Button';
import { SelectPersonInput } from '@/src/colaboradores/components/SelectPersonInput/SelectPersonInput';
import { ExpandableInput } from '@/src/forms/components/ExpandableInput';
import { HistoryIllnessInput } from '@/src/forms/components/HistoryIllnessInput';
import { EmailAddressesInput } from '@/src/forms/components/EmailAddressesInput';
import { PhonesInput } from '@/src/forms/components/PhonesInput';
import { DocumentsInput } from '@/src/forms/components/DocumentsInput';
import { CheckTypeGender } from '@/src/forms/components/CheckTypeGender';
import { BeneficiarioColaboradorValues } from '@/src/beneficiarios/interfaces/BeneficiariosColaboradorSheet';
import { usePersons } from '@/src/beneficiarios/context/PersonContext';
import { updateColaborador } from '../../actions/update-colaboradores';
import { createColaborador } from '../../actions/create-colaborador';

interface ColaboradoresFormProps {
    onClose: () => void;
    editValues?: BeneficiarioColaboradorValues;
}

export const ColaboradoresForm = ({ onClose, editValues }: ColaboradoresFormProps) => {

    const persons = usePersons();
    const [showPersonForm, setShowPersonForm] = useState(false);

    const initialValues = editValues ? JSON.parse(JSON.stringify({ ...editValues })) :
        JSON.parse(JSON.stringify({
            incorporationDate: '',
            terminationDate: '',
            type: '',
            personId: '',
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
            descriptionAllergies: ''
        }));

    const handleRejectToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowPersonForm(e.target.checked); // Muestra o esconde el campo de observación
        //setShowRejectButton(e.target.checked); // Muestra o esconde el botón de rechazar
    };

    const handleSubmit = async (values: BeneficiarioColaboradorValues) => {
        if (!showPersonForm) {
            delete values.bloodType;
            delete values.community;
            delete values.dateOfBirth;
            delete values.descriptionAllergies;
            delete values.documents;
            delete values.phones;
            delete values.electronicAddresses;
            delete values.dateOfBirth;
            delete values.gender;
            delete values.historyIllness;
            delete values.educationLevel;
            delete values.location;
        }
        else {
            delete values.id;
            delete values.personId
        }

        const response = editValues ? await updateColaborador(values) : await createColaborador(values);
        console.log(response)
        if (response.ok) {
            onClose();
        }
        console.log("Entro")
    }

    const FormDebug = () => {
        const { values } = useFormikContext();
        return (
            <pre className="mt-4 bg-gray-100 p-2">
                {JSON.stringify(values, null, 2)}
            </pre>
        );
    };

    return (
        <Formik<BeneficiarioColaboradorValues>
            initialValues={initialValues}
            //validationSchema={validationSchema}
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
                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-4 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">

                                        {
                                            !showPersonForm &&
                                            <SelectPersonInput
                                                title="Seleccionar Persona"
                                                people={persons}
                                            />
                                        }
                                        <InputWithLabel
                                            id="type"
                                            name="type"
                                            type="text"
                                            label="Tipo"
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={`col-span-1 'md:col-span-1'`} // Correcto
                                        />
                                        <SelectDate
                                            name={"incorporationDate"}
                                            title="Fecha de incorporación"
                                            globalStyle={"col-span-1"}
                                        />
                                        <SelectDate
                                            name={"terminationDate"}
                                            title="Fecha de desvinculación"
                                            globalStyle={"col-span-1"}
                                        />
                                    </div>

                                    {
                                        !editValues &&
                                        <div className="col-span-1  md:col-span-4">
                                            <div className='mt-2'>
                                                <label className='flex items-center cursor-pointer'>
                                                    <input
                                                        type="checkbox"
                                                        name="observationCheckbox"
                                                        className='h-5 w-5 text-cb-green border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-cb-green focus:ring-offset-1 transition duration-150 ease-in-out hover:ring-cb-green hover:ring-2 hover:ring-offset-2 mr-3'
                                                        checked={showPersonForm}
                                                        onChange={handleRejectToggle}
                                                    />
                                                    <span className='text-base font-medium text-gray-800 select-none transition duration-150 ease-in-out hover:text-d-blue'>
                                                        ¿ Desea agregar una nueva persona ?
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    }

                                    {
                                        showPersonForm &&
                                        <div className='mt-2 col-span-1 md:col-span-4 space-y-6'>
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
                                                {/* <div >
                                                                                    <FormDebug />
                                                                                </div> */}
                                            </div>
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
                                            text={editValues ? "Editar" : "Agregar"}
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
    )
}
