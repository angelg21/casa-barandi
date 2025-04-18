import { useField } from "formik"

interface SimpleInputProps {
    id: string;
    name: string;
    type: string;
    placeholder?: string;
    label: string;
    labelTextStyle: string;
    inputWidth: string;
    focusBorderColor?: string;
    globalStyle?: string;
}

export const InputWithLabel = ({id, name, type, label, labelTextStyle, inputWidth, focusBorderColor, globalStyle}: SimpleInputProps) => {
    const [ field ] = useField(name)

    return (
        <div className={`flex flex-col  ${globalStyle}`}>
            <label htmlFor={id || name} className={`${labelTextStyle} font-medium leading-6 mb-2`}>{label}</label>
            <input 
                type={type} 
                className={`text-input ${inputWidth} rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 disabled:cursor-not-allowed`}
                { ...field}
            />
            {/* <ErrorMessage name={name} render={msg => <Alert text={msg} type='error' fontSize='text-sm' iconSize='h-5 w-5' padding='p-2'/>} /> */}
        </div>
    )
}
