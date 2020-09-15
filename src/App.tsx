import React, { ChangeEvent } from "react";
import { RestaurantTable } from "./Reastaurant.component";
import { useRestaurantApi } from "./useRestaurant.hook";
import { ColumnDef } from "./Table.types";
import "./App.css";

type ApplicationRoot = ({
  children,
}: React.ComponentProps<React.FC>) => JSX.Element;

const AppRoot: ApplicationRoot = ({ children }) => (
  <main className="App1">{children}</main>
);

function App() {
  const { loading, error, restaurants } = useRestaurantApi();

  if (error) {
    return <AppRoot>{error.message}</AppRoot>;
  }

  if (restaurants) {
    return (
      <AppRoot>
        <RestaurantTable 
          data={restaurants} 
          loading={loading} 
          error={error} 
          alphabeticalSortKey={'city'}
          columnDefs={columnDefs}
        />
      </AppRoot>
    );
  }

  return null;
}

export default App;

const columnDefs: ColumnDef<Record<string, string>>[] = [
  {
    title: "Name",
    key: 'name',
  },
  {
    title: "City",
    key: 'city',
  },
  {
    title: "State",
    key: 'state',
    filterRenderer: (filters, setFilters, filterKey) => {
      return (
        <input 
          type="text" 
          name="" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setFilters({
              ...filters,
              [filterKey]: e.target.value || null
            })
          }} 
          placeholder={`filter ${filterKey}`} 
          id=""
        />
      )
    }, 
    rowRenderer: (showMore: boolean) => {
      return showMore 
        ? (<div>show more!</div>)
        : null
    },
  },
  {
    title: "Telephone",
    key: 'telephone',
  },
  {
    title: "Genre",
    key: 'genre',
    filterRenderer: (filters, setFilters, filterKey) => {
      return (
        <input 
          type="text" 
          name="" 
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setFilters({
              ...filters,
              [filterKey]: e.target.value || null
            })
          }} 
          placeholder={`filter ${filterKey}`} 
          id=""
        />
      )
    }, 
  },
]
