import { Dispatch, SetStateAction } from "react";
import { RestaurantApiError } from "./useRestaurant.hook";

export interface GlobalSearch {
    searchValue: string | undefined,
    fieldsInGlobalScope: string[]
}

export interface TableProps<T> {
    data: T[];
    error: RestaurantApiError;
    loading: boolean;
    alphabeticalSortKey: keyof T;
    columnDefs: ColumnDef<T>[]
    filterFunction: (data: T[], filters: Filters, globalSearch: GlobalSearch) => T[]
    globalSearch: GlobalSearch
}

export type ColumnDefFields = 'title' | 'key' | 'filterRenderer' | 'filterActive' | 'rowRenderer' | 'cellRenderer'
export type ColumnDefValues = Function | string | JSX.Element | boolean | number | undefined;

export type Filters = Record<string, string | null>;

export interface ColumnDef<T> {
    title: string,
    key: string,
    filterRenderer?: (filters: Filters, setFilters: Dispatch<SetStateAction<Filters>>, key: string) => JSX.Element | undefined
    rowRenderer?: (showMore: boolean) => JSX.Element | null
    cellRenderer?: (data: T) => JSX.Element | null
}

