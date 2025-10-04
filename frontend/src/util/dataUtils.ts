export const matchesTextInput = (field: string | undefined, filter: string) => {
  if (!filter) return true;
  return (field ?? "").toLowerCase().includes(filter.toLowerCase());
};

export const matchesSelectOption = (field: string | undefined, filter: string) => {
  if (!filter || filter === "all") return true;
  return (field ?? "").toLowerCase() === filter.toLowerCase();
};