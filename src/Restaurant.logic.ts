import { Filters, GlobalSearch } from "./Table.types";
import { RestaurantTableType } from './Reastaurant.component'

export function filterData<T extends RestaurantTableType>(data: T[], filters: Filters, golbalSearch: GlobalSearch): T[] {

    let newData: T[] = data;

    if (golbalSearch.searchValue && golbalSearch.fieldsInGlobalScope.includes('name')) {
        newData = newData.filter((item: T): boolean => {
            return item.state.toLowerCase().includes(golbalSearch.searchValue!.toLowerCase())
        })
    }

    if (golbalSearch.searchValue && golbalSearch.fieldsInGlobalScope.includes('city')) {
        newData = newData.filter((item: T): boolean => {
            return item.city.toLowerCase().includes(golbalSearch.searchValue!.toLowerCase())
        })
    }

    if (golbalSearch.searchValue && golbalSearch.fieldsInGlobalScope.includes('genre')) {
        newData = newData.filter((item: T): boolean => {
            return item.genre.toLowerCase().includes(golbalSearch.searchValue!.toLowerCase())
        })
    }

    if (filters.state && filters.state !== null) {
        newData = newData.filter((item: T): boolean => {
            return item.state.toLowerCase().includes(filters.state!.toLowerCase())
        })
    }

    if (filters.genre && filters.genre !== null) {
        newData = newData.filter((item: T): boolean => {
            return item.genre.toLowerCase().includes(filters.genre!.toLowerCase())
        })
    }

    return newData
}