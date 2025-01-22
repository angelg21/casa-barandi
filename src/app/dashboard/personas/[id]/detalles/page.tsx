
import { AlertProvider } from "@/src/users/contex/AlertContext";




export default function Detalles() {

    
    return (
        <AlertProvider> {/* Envolver todo en AlertProvider */}
            <div className="px-6 py-6 sm:px-14 sm:py-10 xl:px-16">
                <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">holaa VISUALIZAR Personas</h2>
            </div>
        </AlertProvider>
    );
}