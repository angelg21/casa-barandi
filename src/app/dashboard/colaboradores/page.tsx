import { getAllColaboradores } from "@/src/colaboradores/actions/get-colaboradores";
import { Details } from "@/src/colaboradores/components/Details/Details";


export default async function Colaboradores() {
    
    const { data = [] } = await getAllColaboradores();

    return (
        <div className="mt-8">
            <Details colaboradores={data}/>
        </div>
    );
}