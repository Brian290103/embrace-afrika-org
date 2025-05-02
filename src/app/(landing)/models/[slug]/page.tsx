import { getModelBySlug } from "@/actions/client/clientModelsAction";
import { ClientModel } from "@/typings-client";
import Details from "@/app/(landing)/models/[slug]/details";

export default async function ModelDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const model: ClientModel | null = await getModelBySlug(params.slug);

  if (!model) {
    return <div className="text-center  py-10">Model not found.</div>;
  }

  return <Details model={model} />;
}
