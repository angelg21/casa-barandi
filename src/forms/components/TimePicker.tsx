import { useField } from "formik";

interface TimePickerProps {
    id: string;
    name: string;
    label: string;
    labelTextStyle: string;
    inputWidth: string;
    focusBorderColor?: string;
    globalStyle?: string;
}

export const TimePicker = ({
    id,
    name,
    label,
    labelTextStyle,
    inputWidth,
    focusBorderColor = 'focus:ring-[#08A49C]',
    globalStyle
}: TimePickerProps) => {
    const [field] = useField(name);

    return (
        <div className={`flex flex-col ${globalStyle}`}>
            <label htmlFor={id} className={`${labelTextStyle} font-medium leading-6 mb-2`}>
                {label}
            </label>
            <div className={`relative ${inputWidth}`}>
                <input
                    {...field}
                    type="time"
                    id={id}
                    className={`w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                    ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 
                    ${focusBorderColor} sm:text-sm sm:leading-6 font-normal disabled:opacity-70 
                    disabled:cursor-not-allowed pr-3`}
                />
            </div>
        </div>
    );
};