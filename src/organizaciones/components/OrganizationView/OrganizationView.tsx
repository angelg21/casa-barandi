"use client";

import { Organizacion } from "../../interfaces/Organizacion";

interface OrganizationViewComponentProps {
  data: Organizacion;
}

export const OrganizationViewComponent: React.FC<OrganizationViewComponentProps> = ({
  data,
}) => {
  return (
    <div className="pb-10">

      {/* Sección: Datos de la Organización */}
      <div className="my-10 mx-10">
        <div className="flex px-5 py-3 bg-cb-green rounded-tl-lg rounded-tr-lg justify-between">
          <h3 className="text-base font-semibold leading-7 text-white">
            Datos de la Organización
          </h3>
        </div>
        <div className="px-5 border-t rounded-bl-lg rounded-br-lg bg-white border-gray-100">
          <dl className="divide-y divide-gray-100">
            {/* Razón Social */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Razón Social
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data.razon_social}
              </dd>
            </div>

            {/* RIF */}
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                RIF
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {data.rif}
              </dd>
            </div>
          </dl>
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

    </div>
  );
};