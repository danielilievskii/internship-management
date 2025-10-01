export const matchesFilter = (field: string | undefined, filter: string) => {
  if (!filter || filter === "all") return true;
  return (field ?? "").toLowerCase().startsWith(filter.toLowerCase());
};