'use client'
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from 'yup';
import { InputWithLabel } from "../../../forms/components/InputWithLabel";
import { ButtonComponent } from "@/src/components/Button";
import { Servicio } from "../../interfaces/Servicio";
import { PresciptionInput } from "../PrescriptionInput/PrescriptionInput";
import { ResultInput } from "../ResultInput/ResultInput";
import { PrecautionInput } from "../PrecautionInput/PrecautionInput";


interface ModalProps {
    onClose: () => void;
    editValues?: Servicio;
}

export default function ServicioForm({ onClose, editValues }: ModalProps) {

    const initialValues = editValues ? JSON.parse(JSON.stringify({ ...editValues })) :
        JSON.parse(JSON.stringify({
            description: '',
            type: '',
            subtype: '',
            prescriptions: [],
            results: [],
            precautions: []
        }));

    const validationSchema = Yup.object({
        description: Yup.string()
            .required('La descripción es obligatoria'),
        type: Yup.string()
            .required('El tipo es obligatorio'),
        
    });

    const handleSubmit = async (values: Servicio) => {
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
        <Formik<Servicio>
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
                                        <InputWithLabel
                                            id="type"
                                            name={"type"}
                                            type={"text"}
                                            label={"Tipo"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-1"}
                                        />
                                        <InputWithLabel
                                            id="subtype"
                                            name={"subtype"}
                                            type={"text"}
                                            label={"Subtipo"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-1"}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                        <PresciptionInput
                                            globalStyle={"col-span-1"}
                                        />
                                        <ResultInput
                                            globalStyle={"col-span-1"}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-1 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                        <PrecautionInput
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