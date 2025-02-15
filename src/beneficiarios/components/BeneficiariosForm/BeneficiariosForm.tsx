

import React from 'react'
import { Form, Formik, useFormikContext } from 'formik';
import { InputWithLabel } from '@/src/forms/components/InputWithLabel';
import { SelectDate } from '@/src/forms/components/SelectDate';
import { ButtonComponent } from '@/src/components/Button';
import { BeneficiarioValues, Person } from '../../interfaces/BeneficiariosSheet';
import { SelectPersonInput } from '@/src/colaboradores/components/SelectPersonInput/SelectPersonInput';

const personas: Person[] = [
    {
        ci: "V-12345678",
        name: "Juan Pérez"
    },
    {
        ci: "V-87654321",
        name: "María Rodríguez"
    },
    {
        ci: "V-56789012",
        name: "Carlos López"
    },
    {
        ci: "V-24681357",
        name: "Ana García"
    },
    {
        ci: "V-13579246",
        name: "Luis Martínez"
    },
    {
        ci: "V-98765432",
        name: "Sofía Ramírez"
    },
    {
        ci: "V-76543210",
        name: "Pedro Sánchez"
    },
    {
        ci: "V-43210987",
        name: "Laura Díaz"
    },
    {
        ci: "V-86420975",
        name: "Miguel Vargas"
    },
    {
        ci: "V-28574196",
        name: "Isabella Torres"
    },
    // Puedes agregar más objetos Person aquí
];


interface BeneficiariosFormProps {
    onClose: () => void;
    editValues?: BeneficiarioValues;
}

export const BeneficiariosForm = ({ onClose, editValues }: BeneficiariosFormProps) => {


    const initialValues = editValues ? JSON.parse(JSON.stringify({ ...editValues })) :
        JSON.parse(JSON.stringify({
            incorporationDate: '',
            terminationDate: '',
            type: '',
            personCi: '',
            personName: '',
        }));


    const handleSubmit = async (values: BeneficiarioValues) => {
        // const response = editValues ? await updatePerson(values) : await createPerson(values);
        // console.log(response)
        // if (response.ok) {
        //     onClose();
        // }
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
        <Formik<BeneficiarioValues>
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

                                        <SelectPersonInput
                                            title="Seleccionar Persona"
                                            people={personas}
                                        />
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
