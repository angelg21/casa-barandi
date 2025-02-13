'use client'
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from 'yup';
import { InputWithLabel } from "../../../forms/components/InputWithLabel";
import { Organizacion } from "../../interfaces/Organizacion";
import { EmailAddressesInput } from "../../../forms/components/EmailAddressesInput";
import { PhonesInput } from "../../../forms/components/PhonesInput";
import { ButtonComponent } from "@/src/components/Button";
import { createOrg } from "../../actions/create-org";
import { updateOrg } from "../../actions/update-org";

interface ModalProps {
    onClose: () => void;
    editValues?: Organizacion;
}

export default function OrganizacionForm({ onClose, editValues }: ModalProps) {

    const initialValues = editValues ? JSON.parse(JSON.stringify({ ...editValues })) :
        JSON.parse(JSON.stringify({
            rif: '',
            razon_social: '',
            phones: [],
            electronicAddresses: []
        }));

    const validationSchema = Yup.object({
        rif: Yup.string()
            .max(20, 'El RIF no puede superar los 20 caracteres')
            .required('El RIF es obligatorio'),
        razon_social: Yup.string()
            .max(255, 'La Razón Social no puede superar los 255 caracteres')
            .required('La Razón Social es obligatoria'),
    });

    const handleSubmit = async (values: Organizacion) => {
        const response = editValues ? await updateOrg(values) : await createOrg(values);
        if (response.ok) {
            onClose();
        }
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
        <Formik<Organizacion>
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {() => {
                return (
                    <Form>
                        <div className=''>
                            <div className='flex flex-col mx-5 lg:mx-9'>
                                <div className="h-calc(100vh) overflow-y-auto space-y-10 mb-14 px-1">
                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                        <InputWithLabel
                                            id="rif"
                                            name={"rif"}
                                            type={"text"}
                                            label={"RIF"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-1"}
                                        />
                                        <InputWithLabel
                                            id="razon_social"
                                            name={"razon_social"}
                                            type={"text"}
                                            label={"Razón Social"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-1"}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                        <PhonesInput
                                            globalStyle={"col-span-1"}
                                        />
                                        <EmailAddressesInput
                                            globalStyle={"col-span-1"}
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