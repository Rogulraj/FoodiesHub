export const GetQueryParam = (name: string): string | null => {
  const params = new URLSearchParams(location.search);
  return params.get(name);
};
