
import { useFormikContext } from "formik";
import { Programa } from "../../interfaces/Programa";

interface AliadosSelectedTableProps {
    onDelete: (index: number) => void;
}


export const AliadosSelectedTable = ({ onDelete }: AliadosSelectedTableProps) => {

    const { values } = useFormikContext<Programa>();

    return (
        <div className="max-lg:flex max-lg:justify-center mt-6 md:mt-0 ">
            <div className="overflow-x-auto w-full">
                <div className="inline-block min-w-full align-middle">
                    <table className="min-w-full divide-y divide-gray-300 overflow-hidden rounded-lg">
                        <thead>
                            <tr>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                >
                                    RAZÓN SOCIAL
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                >
                                    TIPO
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                >
                                    TELÉFONO
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                >
                                    DIRECCIÓN ELECTRÓNICA
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-3.5 text-left text-sm font-semibold text-white bg-cb-green"
                                >
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {values.aliados.map((aliado, index) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                                        <div className="font-medium text-gray-900">{aliado.razon_social}</div>
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                                        <div className="font-medium text-gray-900">{aliado.type}</div>
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                                        {aliado.phones?.map((contact, index) => (
                                            <div key={index} className="font-medium text-gray-900 my-4">
                                                {contact.phoneNumber}
                                            </div>
                                        ))}
                                    </td>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm">
                                        {aliado.electronicAddresses?.map((mail, index) => (
                                            <div key={index} className="font-medium text-gray-900 my-4">
                                                {mail.address}
                                            </div>
                                        ))}
                                    </td>


                                    <td className="whitespace-nowrap  pl-8 pr-2 py-4 text-sm text-gray-500">
                                        <div className="flex flex-row gap-6 lg:gap-4">
                                            <button
                                                className=" text-d-red hover:text-red-500 flex items-center font-medium group transition-transform transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                                                onClick={() => onDelete(index)}
                                            >
                                                <svg className='mr-4' width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M16 5L15.1327 17.1425C15.0579 18.1891 14.187 19 13.1378 19H4.86224C3.81296 19 2.94208 18.1891 2.86732 17.1425L2 5M7 9V15M11 9V15M12 5V2C12 1.44772 11.5523 1 11 1H7C6.44772 1 6 1.44772 6 2V5M1 5H17" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-red-500" />
                                                </svg>
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
