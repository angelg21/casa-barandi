import { getServerSession } from "next-auth";
import RegisterForm from "../../../forms/RegisterForm";
import { authOptions } from "@/src/utils/config/auth.options";
import { redirect } from "next/navigation";

const RegisterPage: React.FC = async () => {
  
  const session = await getServerSession(authOptions)

  if (session) {
      redirect("/dashboard/indicadores");
  } 

  return (
    <RegisterForm />
  )
}

export default RegisterPage;