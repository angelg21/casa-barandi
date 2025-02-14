import { getAllAllies } from "@/src/aliados/actions/get-allies";
import { Details } from "@/src/aliados/components/Details/Details";

export default async function Aliados() {
    
    const { data = [] } = await getAllAllies();

    return (
        <div className="mt-8">
            <Details aliados={data}/>
        </div>
    );
}