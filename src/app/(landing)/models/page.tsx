import React from "react";
import HeaderTitle from "@/app/(landing)/components/header-title";
import { getClientModels } from "@/actions/client/clientModelsAction";
import { ClientModel } from "@/typings-client";
import ModelsList from "@/app/(landing)/models/list";

const OurModelsPage = async () => {
  const models: ClientModel[] = await getClientModels();

  console.log(models);
  return (
    <section className={""}>
      <HeaderTitle
        title={"Our Models"}
        bg={true}
        subtitle={"Representing the Heart of Africa"}
      />

      <article className="w-full ">
        {/*<CustomAside />*/}
        <ModelsList models={models} />
      </article>
    </section>
  );
};

export default OurModelsPage;
