import * as React from "react";
import { Restaurant } from "./app.types";
import { RestaurantApiError } from "./useRestaurant.hook";
import { Table } from "./Table.comonent";
import { ColumnDef, GlobalSearch } from "./Table.types";
import { filterData } from "./Restaurant.logic";
import './RestaurantTable.css';

export interface RestaurantTableType {
  name: string;
  city: string;
  state: string;
  telephone: string;
  genre: string;
}

export interface RestaurantTableProps {
  data: Restaurant[];
  error: RestaurantApiError;
  loading: boolean;
  alphabeticalSortKey: keyof RestaurantTableType
  columnDefs: ColumnDef<Record<string, string>>[]
}

export const RestaurantTable: React.FC<RestaurantTableProps> = ({
  data,
  loading,
  error,
  alphabeticalSortKey,
  columnDefs
}): JSX.Element => {

  const [search, setSearch] = React.useState<GlobalSearch>({
    searchValue: undefined,
    fieldsInGlobalScope: ["name", "city", "genre"]
  });

  return (
    <div className="restaurant-table">
      <input
        type="text"
        placeholder={`Filter table on ${search.fieldsInGlobalScope.toString().split(',').join(', ')}`}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch({
            ...search,
            searchValue: e.target.value,
          })
        }}
      />
      <Table
        data={tableData(data)}
        loading={loading}
        error={error}
        alphabeticalSortKey={alphabeticalSortKey}
        columnDefs={columnDefs}
        filterFunction={filterData}
        globalSearch={search}
      />
    </div>
  );
};

function tableData<T extends Restaurant>(restaurants: T[]) {
  return restaurants.map((restaurant: T) => {
    const { name, city, state, telephone, genre } = restaurant;
    return { name, city, state, telephone, genre };
  });
};
