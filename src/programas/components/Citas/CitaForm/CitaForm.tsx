'use client'
import { Form, Formik } from "formik";
import { PersonaFormValues } from "../../../../forms/personas/interfaces/PersonasForm";
import { ButtonComponent } from "@/src/components/Button";
import { useState } from "react";
import { Cita, PersonCita, Programa } from "../../../interfaces/Programa";
import { SelectPersonInputCita } from "../SelectPersonInputCita/SelectPersonInputCita";
import { InputWithLabel } from "@/src/forms/components/InputWithLabel";
import { SelectRepresentativeInputCita } from "../SelectRepresentativeInputCita/SelectRepresentativeInputCita";


interface ModalProps {
    onClose: () => void;
    editValues?: Cita;
    people: PersonCita[];
}

export default function ProgramaForm({ onClose, editValues, people }: ModalProps) {

    const [showRepresentativeForm, setShowRepresentativeForm] = useState(false);

    const initialValues = editValues ? JSON.parse(JSON.stringify({ ...editValues })) :
        JSON.parse(JSON.stringify({
            id: "",
            person: {
                name: "",
                ci: "",
            },
            representative: {
                name: "",
                ci: "",
                related: "",
            },
            dateMade: "",
            dateConfirmation: "",
            confirmed: false,
        }));


    const handleSubmit = async (values: Programa) => {
        // const response = editValues ? await updatePerson(values) : await createPerson(values);
        // console.log(response)
        // if (response.ok) {
        //     onClose();
        // }
        // console.log("Entro")
    }

    const handleRejectToggleRepresentative = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowRepresentativeForm(e.target.checked); // Muestra o esconde el campo de observación
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
                                        <SelectPersonInputCita
                                            title={"Seleccionar Beneficiario"}
                                            people={people}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                        <div className="col-span-1  md:col-span-4">
                                            <div className='mt-2'>
                                                <label className='flex items-center cursor-pointer'>
                                                    <input
                                                        type="checkbox"
                                                        name="observationCheckbox"
                                                        className='h-5 w-5 text-cb-green border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-cb-green focus:ring-offset-1 transition duration-150 ease-in-out hover:ring-cb-green hover:ring-2 hover:ring-offset-2 mr-3'
                                                        checked={showRepresentativeForm}
                                                        onChange={handleRejectToggleRepresentative}
                                                    />
                                                    <span className='text-base font-medium text-gray-800 select-none transition duration-150 ease-in-out hover:text-d-blue'>
                                                        ¿ El beneficiario tiene un representante ?
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {
                                        showRepresentativeForm &&
                                        <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                            <div className=" col-span-1 pb-24">
                                                <SelectRepresentativeInputCita
                                                    title={"Seleccionar Representante"}
                                                    people={people}
                                                />

                                            </div>
                                            <InputWithLabel
                                                id="representative-related"
                                                name={"representative.related"}
                                                type={"text"}
                                                label={"Vínculo"}
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