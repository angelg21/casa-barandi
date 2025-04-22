'use client'
import { Form, Formik, useFormikContext } from "formik";
import { PersonaFormValues } from "../../../../forms/personas/interfaces/PersonasForm";
import { ButtonComponent } from "@/src/components/Button";
import { Cita, Programa } from "../../../interfaces/Programa";
import { SelectPersonInputCita } from "../SelectPersonInputCita/SelectPersonInputCita";


interface ModalProps {
    onClose: () => void;
    editValues?: Cita;
    people: any[];
}

export default function ProgramaForm({ onClose, editValues, people }: ModalProps) {

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