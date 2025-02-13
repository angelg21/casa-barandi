'use client'

import { ButtonComponent } from "@/src/components/Button";
import { AliadoValues, Company } from "../../interfaces/AliadosSheet";
import { Form, Formik, useFormikContext } from "formik";
import { InputWithLabel } from "@/src/forms/components/InputWithLabel";
import { SelectDate } from "@/src/forms/components/SelectDate";
import SelectCompanyInput from "../SelectCompanyInput/SelectCompanyInput";
import { useState } from "react";
import { PhonesInput } from "@/src/forms/components/PhonesInput";
import { EmailAddressesInput } from "@/src/forms/components/EmailAddressesInput";

interface AliadosFormProps {
    onClose: () => void;
    editValues?: AliadoValues;
}

const companies: Company[] = [
    { id: '1', name: 'UCAB' },
    { id: '2', name: 'Rotary International' },
    { id: '3', name: 'Compañía C' },
    { id: '4', name: 'Organización XYZ' },
    { id: '5', name: 'Empresa ABC' },
    { id: '6', name: 'Corporación DEF' },
    { id: '7', name: 'Asociación GHI' },
    { id: '8', name: 'Fundación JKL' },
    { id: '9', name: 'Sociedad MNO' },
    { id: '10', name: 'Cooperativa PQR' },
    { id: '11', name: 'Consultora STU' },
    { id: '12', name: 'Grupo VWA' },
    { id: '13', name: 'Instituto 123' },
    { id: '14', name: 'Universidad 456' },
    { id: '15', name: 'Academia 789' },
    { id: '16', name: 'Centro de Estudios 012' },
    { id: '17', name: 'Compañía de Seguros AAA' },
    { id: '18', name: 'Banco BBB' },
    { id: '19', name: 'Inmobiliaria CCC' },
    { id: '20', name: 'Constructora DDD' },
    { id: '21', name: 'Fábrica EEE' },
    { id: '22', name: 'Distribuidora FFF' },
    { id: '23', name: 'Importadora GGG' },
    { id: '24', name: 'Exportadora HHH' },
    { id: '25', name: 'Tienda de Retail III' },
    { id: '26', name: 'Supermercado JJJ' },
    { id: '27', name: 'Restaurante KKK' },
    { id: '28', name: 'Cafetería LLL' },
    { id: '29', name: 'Barbería MMM' },
    { id: '30', name: 'Salón de Belleza NNN' },
    { id: '31', name: 'Gimnasio OOO' },
    { id: '32', name: 'Spa PPP' },
    { id: '33', name: 'Clínica QQQ' },
    { id: '34', name: 'Hospital RRR' },
    { id: '35', name: 'Farmacia SSS' },
    { id: '36', name: 'Librería TTT' },
    { id: '37', name: 'Papelería UUU' },
    { id: '38', name: 'Juguetería VVV' },
    { id: '39', name: 'Zapatería WWW' },
    { id: '40', name: 'Tienda de Ropa XXX' },
    { id: '41', name: 'Almacén YYY' },
    { id: '42', name: 'Bodega ZZZ' },
    { id: '43', name: 'Empresa de Transporte 111' },
    { id: '44', name: 'Agencia de Viajes 222' },
    { id: '45', name: 'Hotel 333' },
    { id: '46', name: 'Hostal 444' },
    { id: '47', name: 'Apartamento 555' },
    { id: '48', name: 'Casa 666' },
    { id: '49', name: 'Edificio 777' },
    { id: '50', name: 'Parque 888' },
    // ... Puedes agregar más compañías aquí
];

export const AliadosForm = ({ onClose, editValues }: AliadosFormProps) => {

    
    const [showCompanyForm, setShowCompanyForm] = useState(false);

    const initialValues = editValues ? JSON.parse(JSON.stringify({ ...editValues })) :
        JSON.parse(JSON.stringify({
            incorporationDate: '',
            terminationDate: '',
            type: '',
            companyId: '',
        }));


    const handleSubmit = async (values: AliadoValues) => {
        // const response = editValues ? await updatePerson(values) : await createPerson(values);
        // console.log(response)
        // if (response.ok) {
        //     onClose();
        // }
        console.log("Entro")
    }

    const handleRejectToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowCompanyForm(e.target.checked); // Muestra o esconde el campo de observación
        //setShowRejectButton(e.target.checked); // Muestra o esconde el botón de rechazar
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
        <Formik<AliadoValues>
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
                                            !showCompanyForm &&
                                            <SelectCompanyInput
                                                title="Seleccionar Organización"
                                                companies={companies}
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
                                            globalStyle={`col-span-1 ${showCompanyForm ? 'md:col-span-2' : 'md:col-span-1'}`} // Correcto
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

                                        {
                                            !editValues &&
                                            <div className="col-span-1  md:col-span-4">
                                                <div className='mt-2'>
                                                    <label className='flex items-center cursor-pointer'>
                                                        <input
                                                            type="checkbox"
                                                            name="observationCheckbox"
                                                            className='h-5 w-5 text-cb-green border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-cb-green focus:ring-offset-1 transition duration-150 ease-in-out hover:ring-cb-green hover:ring-2 hover:ring-offset-2 mr-3'
                                                            checked={showCompanyForm}
                                                            onChange={handleRejectToggle}
                                                        />
                                                        <span className='text-base font-medium text-gray-800 select-none transition duration-150 ease-in-out hover:text-d-blue'>
                                                            ¿ Desea agregar una nueva organización ?
                                                        </span>
                                                    </label>
                                                </div>
                                            </div>
                                        }

                                        {
                                            showCompanyForm && (
                                                <div className='mt-2 col-span-1 md:col-span-4 space-y-6'>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                                                        <InputWithLabel
                                                            id="rif"
                                                            name={"rif"}
                                                            type={"text"}
                                                            label={"RIF"}
                                                            labelTextStyle={"text-gray-900 text-sm"}
                                                            inputWidth={"w-full "}
                                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                                            globalStyle={"col-span-1"}
                                                        />
                                                        <InputWithLabel
                                                            id="razon_social"
                                                            name={"razon_social"}
                                                            type={"text"}
                                                            label={"Razón Social"}
                                                            labelTextStyle={"text-gray-900 text-sm"}
                                                            inputWidth={"w-full "}
                                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                                            globalStyle={"col-span-1"}
                                                        />
                                                    </div>


                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                        <PhonesInput
                                                            globalStyle={"col-span-1"}
                                                        />
                                                        <EmailAddressesInput
                                                            globalStyle={"col-span-1"}
                                                        />
                                                    </div>
                                                </div>
                                            )
                                        }
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
                                            text="Agregar"
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
