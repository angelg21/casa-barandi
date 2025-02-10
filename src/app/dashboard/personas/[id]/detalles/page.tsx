import { getPerson } from "@/src/personas/actions/get-person-by-id";
import { redirect } from "next/navigation";
import { PersonViewComponent } from "@/src/personas/components/PersonView/PersonView";

export default async function PersonViewPage({
    params,
  }: {
    // 👇 Declaramos que `params` es una Promise
    params: Promise<{ id: string }>;
  }) {
    const { id } = await params;

  const response = await getPerson(id);

  if (!response.ok) {
    redirect("/dashboard/personas");
  }

  return (
    <main>
      <PersonViewComponent data={response.data} />
    </main>
  );
}