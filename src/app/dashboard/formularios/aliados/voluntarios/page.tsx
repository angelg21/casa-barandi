import VoluntariosForm from "@/src/forms/components/aliados/VoluntariosForm/VoluntariosForm";





export default function FormularioVoluntarios() {
    return (
        <div className="flex flex-col px-6 py-6 sm:px-14 xl:px-16">
            <h2 className="text-cb-gray-letter font-bold text-5xl mb-7">Voluntarios</h2>
            <VoluntariosForm />
        </div>
    );
}