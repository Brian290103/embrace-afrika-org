import React from "react";
import HeaderTitle from "@/app/(landing)/components/header-title";
import ModelsCard from "@/app/(landing)/components/cards/models-cards";
import { getClientModels } from "@/actions/client/clientModelsAction";
import { ClientModel } from "@/typings-client";
import { shuffleArray } from "@/lib/utils";

const OurModelsSection = async () => {
  const models: ClientModel[] = await getClientModels();
  const shuffledModels = shuffleArray(models);

  return (
    <section>
      <HeaderTitle
        title={"Our Models"}
        bg={true}
        subtitle={"Representing the Heart of Africa"}
      />

      <article className="w-full">
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 p-3">
          {shuffledModels.map((item, index) => (
            <li key={index}>
              <ModelsCard model={item} />
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default OurModelsSection;
