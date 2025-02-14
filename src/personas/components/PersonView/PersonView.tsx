"use client";

import { Persona } from "../../interfaces/Persona";

interface PersonViewComponentProps {
  data: Persona;
}

export const PersonViewComponent: React.FC<PersonViewComponentProps> = ({
  data,
}) => {
    return (
        <div className="pb-10">
    
          {/* Sección: Datos Personales */}
          <div className="my-10 mx-10">
            <div className="flex px-5 py-3 bg-cb-green rounded-tl-lg rounded-tr-lg justify-between">
              <h3 className="text-base font-semibold leading-7 text-white">
                Datos Personales
              </h3>
            </div>
            <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
              <dl className="divide-y divide-gray-100">
                {/* Nombre Completo */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Nombre Completo
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.fullName}
                  </dd>
                </div>
    
                {/* Género */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Género
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.gender}
                  </dd>
                </div>
    
                {/* Fecha de Nacimiento */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Fecha de Nacimiento
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.dateOfBirth}
                  </dd>
                </div>
    
                {/* Tipo de Sangre */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Tipo de Sangre
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.bloodType}
                  </dd>
                </div>
    
                {/* Nivel Educativo */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Nivel Educativo
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.educationLevel}
                  </dd>
                </div>
    
                {/* Comunidad */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Comunidad
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.community}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
    
          {/* Sección: Documentos */}
          <div className="my-10 mx-10">
            <div className="flex px-5 py-3 bg-cb-green rounded-tl-lg rounded-tr-lg justify-between">
              <h3 className="text-base font-semibold leading-7 text-white">
                Documentos
              </h3>
            </div>
            <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
              {data.documents?.length > 0 ? (
                <dl className="divide-y divide-gray-100">
                  {data.documents.map((doc, index) => (
                    <div key={index}>
                      {/* Tipo de Documento */}
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          {doc.documentType}
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {doc.documentNumber}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              ) : (
                <div className="px-4 py-6">
                  <p className="text-sm leading-6 text-gray-700">
                    No hay documentos registrados.
                  </p>
                </div>
              )}
            </div>
          </div>
    
          {/* Sección: Direcciones Electrónicas */}
          <div className="my-10 mx-10">
            <div className="flex px-5 py-3 bg-cb-green rounded-tl-lg rounded-tr-lg justify-between">
              <h3 className="text-base font-semibold leading-7 text-white">
                Direcciones Electrónicas
              </h3>
            </div>
            <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
              {data.electronicAddresses?.length > 0 ? (
                <dl className="divide-y divide-gray-100">
                  {data.electronicAddresses.map((ea, index) => (
                    <div key={index}>
                      {/* Tipo de Dirección */}
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          {ea.addressType}
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {ea.address}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              ) : (
                <div className="px-4 py-6">
                  <p className="text-sm leading-6 text-gray-700">
                    No hay direcciones electrónicas registradas.
                  </p>
                </div>
              )}
            </div>
          </div>
    
          {/* Sección: Teléfonos */}
          <div className="my-10 mx-10">
            <div className="flex px-5 py-3 bg-cb-green rounded-tl-lg rounded-tr-lg justify-between">
              <h3 className="text-base font-semibold leading-7 text-white">
                Teléfonos
              </h3>
            </div>
            <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
              {data.phones?.length > 0 ? (
                <dl className="divide-y divide-gray-100">
                  {data.phones.map((phone, index) => (
                    <div key={index}>
                      {/* Tipo de Teléfono */}
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          {phone.phoneType}
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {phone.phoneNumber}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              ) : (
                <div className="px-4 py-6">
                  <p className="text-sm leading-6 text-gray-700">
                    No hay teléfonos registrados.
                  </p>
                </div>
              )}
            </div>
          </div>
    
          {/* Sección: Ubicación */}
          <div className="my-10 mx-10">
            <div className="flex px-5 py-3 bg-cb-green rounded-tl-lg rounded-tr-lg justify-between">
              <h3 className="text-base font-semibold leading-7 text-white">
                Ubicación
              </h3>
            </div>
            <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
              <dl className="divide-y divide-gray-100">
                {/* Dirección de Casa */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Dirección de Casa
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.location.houseAddress}
                  </dd>
                </div>
    
                {/* Parroquia */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Parroquia
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.location.parish}
                  </dd>
                </div>
    
                {/* Municipio */}
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Municipio
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.location.municipality}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
    
          {/* Sección: Historial de Enfermedades */}
          <div className="my-10 mx-10">
            <div className="flex px-5 py-3 bg-cb-green rounded-tl-lg rounded-tr-lg justify-between">
              <h3 className="text-base font-semibold leading-7 text-white">
                Historial de Enfermedades
              </h3>
            </div>
            <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
              {data.historyIllness?.length > 0 ? (
                <dl className="divide-y divide-gray-100">
                  {data.historyIllness.map((illness, index) => (
                    <div key={index}>
                      {/* Descripción de la Enfermedad */}
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Descripción de la Enfermedad
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {illness.illnessDescription}
                        </dd>
                      </div>
    
                      {/* Fecha de la Enfermedad */}
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Fecha de la Enfermedad
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {illness.dateIllness}
                        </dd>
                      </div>
    
                      {/* Severidad */}
                      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dt className="text-sm font-medium leading-6 text-gray-900">
                          Severidad
                        </dt>
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                          {illness.severity}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              ) : (
                <div className="px-4 py-6">
                  <p className="text-sm leading-6 text-gray-700">
                    No hay historial de enfermedades registrado.
                  </p>
                </div>
              )}
            </div>
          </div>
    
          {/* Sección: Alergias */}
          <div className="mt-10 mx-10">
            <div className="flex px-5 py-3 bg-cb-green rounded-tl-lg rounded-tr-lg justify-between">
              <h3 className="text-base font-semibold leading-7 text-white">
                Alergias
              </h3>
            </div>
            <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Descripción de Alergias
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {data.descriptionAllergies || "No posee alergias registradas."}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      );
};