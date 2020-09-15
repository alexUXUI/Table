import * as React from "react";
import { alphabeticalSort } from "./Table.logic";
import { ColumnDef, TableProps, Filters } from "./Table.types";
import "./table.css";

function paginate<T>(array: T[], page_size: number, page_number: number): T[] {
  return array.slice((page_number - 1) * page_size, page_number * page_size);
}

function generateFilterStateFromColumnsDefs<T>(columnDefs: ColumnDef<T>[]): Filters {
  return columnDefs.reduce((acc: Filters, column: ColumnDef<T>): Filters => {
    if (column.filterRenderer) {
      return {
        ...acc,
        [column.key]: null
      }
    }
    return acc;
  }, {})
}

export const Table = <T extends Record<string, string>>({
  data,
  loading,
  error,
  alphabeticalSortKey,
  columnDefs,
  filterFunction,
  globalSearch
}: TableProps<T>): JSX.Element => {

  const [page, setPage] = React.useState<number>(1);
  const incrementPage = (page: number) => setPage(page + 1);
  const decrementPage = (page: number) => setPage(page - 1);

  const columnFilters: Filters = React.useMemo(() => generateFilterStateFromColumnsDefs(columnDefs), [columnDefs]);

  const [filters, setFilters] = React.useState<Filters>(columnFilters);

  const filteredData = React.useMemo(() => filterFunction(data, filters, globalSearch), [data, globalSearch, filters]);

  const pages = React.useMemo(() => Math.ceil(filteredData.length / 10), [data, filters]);

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            {
              data && data.length && columnDefs && columnDefs.length
                ? (
                  columnDefs.map((column: ColumnDef<T>, key: number) => {
                    return (
                      <th key={key}>
                        <span className="header-content">
                          {column.title}
                          {
                            column.filterRenderer
                              ? column.filterRenderer(filters, setFilters, column.key)
                              : null
                          }
                        </span>
                      </th>
                    )
                  })
                ) : null
            }
          </tr>
        </thead>
        <tbody>
          {loading && <div className="loading">Loading...</div>}
          {error && `error: ${error.message}`}
          {data && data.length ? (
            paginate(alphabeticalSort(filteredData, alphabeticalSortKey), 10, page).slice(0, data.length).map(
              (row: T, i: number): JSX.Element => {
                return (
                  <tr key={i}>
                    {(Object.keys(data[0]) as Array<keyof T>).map((key: keyof T): JSX.Element => (
                      <td key={key.toString()}>
                        <span className="cell-content">{row[key]}</span>
                      </td>
                    ))}
                  </tr>
                );
              }
            )
          ) : null}
          {
            !loading && !filteredData.length
              ? <div className="loading">No data. Broaden your search to see more results.</div>
              : null
          }
        </tbody>
      </table>
      <div className="table-footer" >
        <span className="button-group">
          <button
            disabled={page - 1 <= 0}
            onClick={() => {
              if (page - 1 > 0) {
                decrementPage(page)
              }
            }}
          >
            back
          </button>
          {
            Array.from(Array(pages).keys()).map((pageBtn: number) => {
              return (
                <button
                  key={pageBtn}
                  className={`${page === pageBtn + 1 ? 'active' : null}`}
                  onClick={() => setPage(pageBtn + 1)}>{pageBtn + 1}
                </button>
              )
            })
          }
          <button
            disabled={page >= pages}
            onClick={() => {
              if (page <= pages) {
                incrementPage(page)
              }
            }}
          >
            forward
          </button>
        </span>
      </div>
    </div>
  );
};
