"use client";
import React, { useState, useTransition } from 'react';
import { FormTemplate } from '../forms/FormTemplate';
import { registerUser } from '../forms/actions/register-user';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormValues } from './interfaces/FormTemplateProps';

const RegisterForm: React.FC = () => {

    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();
    const router = useRouter(); 

    const handleSubmit = async (values: FormValues) => {
        setError(null);
        startTransition(async () => {
            try {
                await registerUser(values);
                const signInResponse = await signIn('credentials', {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                });

                if (signInResponse?.error) {
                    setError(signInResponse.error);
                } else {
                    router.replace('/dashboard/indicadores');
                }
            } catch (error) {
                if (error instanceof Error) {
                    if (error.message === "fetch failed") {
                        setError("Error al registrar el usuario.");
                        return;
                    }
                    setError(error.message);
                } else {
                    setError("Ocurrió un error inesperado.");
                }
            }
        });
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background image with a dark overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('/ucab.jpg')` }}
            >
                {/* Dark overlay to darken the background image */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>

            {/* Form container */}
            <div className="relative z-10 w-full max-w-sm mx-auto my-auto">
                <FormTemplate
                    formTitle="Regístrate"
                    inputs={[
                        { id: 'name', name: 'name', type: 'text', labelText: 'Nombre Completo', placeholder: '' },
                        { id: 'email', name: 'email', type: 'email', labelText: 'Correo electrónico', placeholder: '' },
                        { id: 'password', name: 'password', type: 'password', labelText: 'Contraseña', placeholder: '' },
                    ]}
                    buttonText="Registrarse"
                    linkQuestion="¿Ya tienes una cuenta?"
                    linkText="Iniciar Sesión"
                    linkHref="/auth/login"
                    initialValues={{ name: '', email: '', password: '' }}
                    onSubmit={handleSubmit}
                    error={error}
                    isPending={isPending}
                />
            </div>
        </div>
    );
};

export default RegisterForm;