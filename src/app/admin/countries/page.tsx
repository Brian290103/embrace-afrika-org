import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CountryDialog from "@/app/admin/countries/dialog";
import { getCountries } from "@/actions/countriesAction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteConfirmationDialog from "@/app/admin/countries/delete-dialog";
import EditDialog from "@/app/admin/countries/edit";
import { CountriesType } from "@/typings";

const CountriesPage = async () => {
  const countries: CountriesType[] = await getCountries();

  return (
    <section className={"flex flex-col gap-4"}>
      <Card>
        <CardHeader>
          <CardTitle>Manage Countries</CardTitle>
          <CardDescription>View and manage countries.</CardDescription>
        </CardHeader>
        <CardContent>
          <CountryDialog />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Countries</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Flag</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {countries.map((country) => (
                <TableRow key={country.id}>
                  <TableCell>{country.name}</TableCell>
                  <TableCell>
                    <img
                      src={country.flagUrl}
                      alt={`${country.name} flag`}
                      className="h-6 w-10 rounded object-cover"
                    />
                  </TableCell>
                  <TableCell>
                    <div className={"flex items-center gap-2"}>
                      <EditDialog
                        id={country.id}
                        name={country.name}
                        flagUrl={country.flagUrl}
                      />
                      <DeleteConfirmationDialog
                        name={country.name}
                        id={country.id}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
};

export default CountriesPage;
