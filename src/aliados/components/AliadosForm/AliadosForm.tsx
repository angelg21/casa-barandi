'use client'
import { ButtonComponent } from "@/src/components/Button";
import { AliadoValues } from "../../interfaces/AliadosSheet";
import { Form, Formik } from "formik";
// import { useFormikContext } from "formik";
import { InputWithLabel } from "@/src/forms/components/InputWithLabel";
import { SelectDate } from "@/src/forms/components/SelectDate";
import SelectCompanyInput from "../SelectCompanyInput/SelectCompanyInput";
import { useState } from "react";
import { PhonesInput } from "@/src/forms/components/PhonesInput";
import { EmailAddressesInput } from "@/src/forms/components/EmailAddressesInput";
import { useOrgs } from "@/src/organizaciones/context/OrgContext";
import { updateAllie } from "../../actions/update-allie";
import { createAllie } from "../../actions/create-allie";

interface AliadosFormProps {
    onClose: () => void;
    editValues?: AliadoValues;
}

export const AliadosForm = ({ onClose, editValues }: AliadosFormProps) => {

    const companies = useOrgs();
    const [showCompanyForm, setShowCompanyForm] = useState(false);

    const initialValues = editValues ? JSON.parse(JSON.stringify({ ...editValues })) :
        JSON.parse(JSON.stringify({
            incorporationDate: '',
            terminationDate: '',
            type: '',
            companyId: '',
            rif: '',
            razon_social: '',
            phones: [],
            electronicAddresses: []
        }));


    const handleSubmit = async (values: AliadoValues) => {
        if (!showCompanyForm) {
            delete values.rif;
            delete values.razon_social;
            delete values.phones;
            delete values.electronicAddresses;
        }
        else {
            delete values.companyId;
        }

        const response = editValues ? await updateAllie(values) : await createAllie(values);
        console.log(response)
        if (response.ok) {
            onClose();
        }
        console.log("Entro")
    }

    const handleRejectToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowCompanyForm(e.target.checked); // Muestra o esconde el campo de observación
        //setShowRejectButton(e.target.checked); // Muestra o esconde el botón de rechazar
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
    )
}
