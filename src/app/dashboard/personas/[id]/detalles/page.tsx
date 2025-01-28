
import PersonasForm from "@/src/forms/personas/PersonasForm/PersonasForm";
import { AlertProvider } from "@/src/users/contex/AlertContext";




export default function Detalles() {


    return (
        <AlertProvider> {/* Envolver todo en AlertProvider */}
            <div className="px-6 py-6 sm:px-14 sm:py-10 ">
                <h2 className="mx-5 lg:mx-9 text-cb-gray-letter font-bold text-4xl mb-7">Datos Personales</h2>
                <PersonasForm />
            </div>
        </AlertProvider>
    );
}