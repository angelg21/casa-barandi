import { getAllBeneficiarios } from "@/src/beneficiarios/actions/get-beneficiarios";
import { Details } from "@/src/beneficiarios/components/Details/Details";

export default async function Beneficiarios() {
    
    const { data = [] } = await getAllBeneficiarios(); 

    return (
        <div className="mt-8">
            <Details beneficiarios={data}/>
        </div>
    );
}