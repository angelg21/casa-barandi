'use client'

import { useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { es } from 'date-fns/locale';
import { format, parse } from 'date-fns';

interface DatePickerProps<T> {
    name: keyof T;
    title: string;
    globalStyle?: string;
}

export const CustomDatePicker = <T,>({ name, title, globalStyle }: DatePickerProps<T>) => {
    const { values, setFieldValue } = useFormikContext<T>();
    const dateValue = values[name] as string;

    const parseDate = (dateString: string) => {
        try {
            return parse(dateString, 'dd/MM/yyyy', new Date());
        } catch {
            return null;
        }
    };

    const handleChange = (date: Date | null) => {
        if (date) {
            const formattedDate = format(date, 'dd/MM/yyyy');
            setFieldValue(name as string, formattedDate);
        } else {
            setFieldValue(name as string, '');
        }
    };

    return (
        <div className={`flex flex-col ${globalStyle}`}>
            <label className="text-sm font-medium text-gray-900 leading-6 mb-2">
                {title}
            </label>
            <DatePicker
                selected={dateValue ? parseDate(dateValue) : null}
                onChange={handleChange}
                locale={es}
                dateFormat="dd/MM/yyyy"
                placeholderText="Seleccionar fecha"
                className="w-full rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset 
                ring-gray-300 hover:ring-gray-400 h-9 placeholder:text-gray-400 focus:ring-2 
                focus:ring-[#08A49C] sm:text-sm sm:leading-6 font-normal disabled:opacity-70 
                disabled:cursor-not-allowed pl-3 pr-10"
                showPopperArrow={false}
                popperClassName="!mt-2 shadow-lg ring-1 ring-gray-300 rounded-md"
            />
        </div>
    );
};