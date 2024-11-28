import { authOptions } from "@/src/utils/config/auth.options";
import LoginForm from "../../../forms/LoginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginPage: React.FC = async () => {
  
  const session = await getServerSession(authOptions)

  if (session) {
      redirect("/dashboard/indicadores");
  } 

  return (
    <LoginForm />
  )
}

export default LoginPage;