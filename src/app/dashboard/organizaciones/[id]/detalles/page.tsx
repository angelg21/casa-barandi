import { redirect } from "next/navigation";
import { getOrg } from "@/src/organizaciones/actions/get-org-by-id";
import { OrganizationViewComponent } from "@/src/organizaciones/components/OrganizationView/OrganizationView";

export default async function OrganizationViewPage({
    params,
  }: {
    // 👇 Declaramos que `params` es una Promise
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;

  const response = await getOrg(id);

  if (!response.ok) {
    redirect("/dashboard/organizaciones");
  }

  return (
    <main>
      <OrganizationViewComponent data={response.data} />
    </main>
  );
}