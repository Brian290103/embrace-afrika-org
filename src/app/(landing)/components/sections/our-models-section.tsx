import React from "react";
import HeaderTitle from "@/app/(landing)/components/header-title";
import ModelsCard from "@/app/(landing)/components/cards/models-cards";
import { getClientModels } from "@/actions/client/clientModelsAction";

const OurModelsSection = async () => {
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
        <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid gap-3 p-3">
          {models.map((item, index) => (
            <li className={""} key={index}>
              <ModelsCard model={item} />
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
};

export default OurModelsSection;
