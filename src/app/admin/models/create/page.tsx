import React from "react";
import ModelForm from "@/app/admin/models/form";
import { getCountries } from "@/actions/countriesAction";

const CreateNewsPage = async () => {
  const countries = await getCountries();
  console.log(countries);
  return (
    <div>
      <ModelForm countriesList={countries} />
    </div>
  );
};

export default CreateNewsPage;
