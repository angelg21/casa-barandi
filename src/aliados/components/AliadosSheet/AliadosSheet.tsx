import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { AliadoSheetValues } from "../../interfaces/AliadosSheet";


interface AliadosSheetProps {
    aliados: AliadoSheetValues[];
}

export const AliadosSheet = ({ aliados }: AliadosSheetProps) => {



    return (
        <div className="mt-16 space-y-4">
            {aliados.map((aliado, index) => (
                <div key={index} className="grid grid-cols-1 gap-y-6 md:grid-cols-4 bg-slate-50 p-5 rounded-md">
                    <div className="col-span-1">
                        <div className="flex flex-row justify-between">
                            <div className="felx flex-col">
                                <span className="flex text-sm font-semibold">{aliado.name}</span>
                                <span className="flex text-sm font-medium">{aliado.rif}</span>
                            </div>
                            <EllipsisHorizontalIcon className="md:hidden h-6 w-6 text-gray-700"/>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-row justify-between">
                            <div className="felx flex-col">
                                <span className="flex text-sm font-semibold">Razón Social</span>
                                <span className="flex text-sm font-medium">{aliado.companyName}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1">
                        <div className="flex flex-row justify-between">
                            <div className="felx flex-col">
                                <span className="flex text-sm font-semibold">Rol</span>
                                <span className="flex text-sm font-medium">{aliado.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div >
    )
}
