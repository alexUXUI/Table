export type AlphabeticalSort = <T extends Record<string, string>>(data: T[], alphabeticalSortKey: keyof T) => T[]

export const alphabeticalSort: AlphabeticalSort = (data, alphabeticalSortKey) => {
  return data.sort((a, b) => {
    let nameA = a[alphabeticalSortKey];
    let nameB = b[alphabeticalSortKey];
    return nameA.localeCompare(nameB);
  })
}