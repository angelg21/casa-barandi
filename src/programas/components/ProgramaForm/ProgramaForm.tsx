'use client'
import { Form, Formik, useFormikContext } from "formik";
import * as Yup from 'yup';
import { InputWithLabel } from "../../../forms/components/InputWithLabel";
import { ButtonComponent } from "@/src/components/Button";
import { Programa } from "../../interfaces/Programa";
import { SelectAliadosInput } from "../SelectAliadosInput/SelectAliadosInput";
import { SelectColaboradoresInput } from "../SelectColaboradoresInput/SelectColaboradoresInput";
import { TimePicker } from "@/src/forms/components/TimePicker";
import { CustomDatePicker } from "../DateSelector/DateSelector";
import { SelectServiceInput } from "../SelectServicioInput/SelectServicioInput";
import { createPrograma } from "../../actions/create-programa";
import { updatePrograma } from "../../actions/update-programa";


interface ModalProps {
    onClose: () => void;
    editValues?: Programa;
}

export default function ProgramaForm({ onClose, editValues }: ModalProps) {

    const getInitialValues = (editValues?: Programa): Programa => {
        const baseValues = {
            description: '',
            dateStart: '',
            timeStart: '',
            timeEnd: '',
            peopleLimit: 0,
            community: '',
            address: '',
            serviceId: '',
            observation: '',
            aliados: [],
            colaboradores: [],
            state: ''
        };
    
        if (!editValues) return baseValues;
    
        return {
            ...editValues,
            aliados: editValues.aliados.map(({ id, name, role, rif }) => ({ id, name, role, rif })),
            colaboradores: editValues.colaboradores.map(({ id, name, role, documents }) => ({ id, name, role, documents })),
        };
    };

        const validationSchema = Yup.object({
            description: Yup.string().required('La descripción es obligatoria'),
            dateStart: Yup.string().required('La fecha es obligatoria'),
            timeStart: Yup.string().required('La hora de inicio es obligatoria'),
            timeEnd: Yup.string().required('La hora de cierre es obligatoria'),
            peopleLimit: Yup.number()
                .min(1, 'Mínimo 1 persona')
                .required('El límite de personas es obligatorio'),
            community: Yup.string().required('La comunidad es obligatoria'),
            aliados: Yup.array().of(
                Yup.object().shape({
                    id: Yup.string().required('El ID del aliado es obligatorio'),
                    name: Yup.string().required('El nombre del aliado es obligatorio'),
                    role: Yup.string().required('El rol del aliado es obligatorio'),
                })
            ),
            colaboradores: Yup.array().of(
                Yup.object().shape({
                    id: Yup.string().required('El ID del colaborador es obligatorio'),
                    name: Yup.string().required('El nombre del colaborador es obligatorio'),
                    role: Yup.string().required('El rol del colaborador es obligatorio'),
                })
            ),
        });

    const handleSubmit = async (values: Programa) => {
        const response = editValues ? await updatePrograma(values) : await createPrograma(values);
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
        <Formik<Programa>
            initialValues={getInitialValues(editValues)}
            validationSchema={validationSchema} 
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
                                        <SelectServiceInput
                                                globalStyle="col-span-1"
                                        />
                                        <CustomDatePicker<Programa>
                                            name="dateStart"
                                            title="Fecha de Fundación"
                                            globalStyle="col-span-1"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-y-8 md:grid-cols-3 xl:gap-x-14 md:gap-y-7 md:gap-x-7 xl:gap-y-8">
                                        <TimePicker
                                            id="timeStart"
                                            name="timeStart"
                                            label="Hora de Inicio"
                                            labelTextStyle="text-gray-900 text-sm"
                                            inputWidth="w-full"
                                            focusBorderColor="focus:ring-[#08A49C]"
                                            globalStyle="col-span-1 md:col-span-1"
                                        />
                                        <TimePicker
                                            id="timeEnd"
                                            name="timeEnd"
                                            label="Hora de Cierre"
                                            labelTextStyle="text-gray-900 text-sm"
                                            inputWidth="w-full"
                                            focusBorderColor="focus:ring-[#08A49C]"
                                            globalStyle="col-span-1 md:col-span-1"
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
                                        <InputWithLabel
                                            id="address"
                                            name={"address"}
                                            type={"text"}
                                            label={"Dirección"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-2"}
                                        />
                                        <InputWithLabel
                                            id="observation"
                                            name={"observation"}
                                            type={"text"}
                                            label={"Observación"}
                                            labelTextStyle={"text-gray-900 text-sm"}
                                            inputWidth={"w-full "}
                                            focusBorderColor={"focus:ring-[#08A49C]"}
                                            globalStyle={"col-span-1 md:col-span-3"}
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
                                    {<div >
                                        <FormDebug />
                                    </div>}
                                </div>
                            </div>
                        </div>
                    </Form>
                );
            }}
        </Formik>
    );
}