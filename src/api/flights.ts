import { useQuery } from "@tanstack/react-query";

export async function getFlight() {
  const url = import.meta.env.VITE_URL;
  const response = await fetch(url);
  return response.json();
}

function useGetFlight() {
  const queryKey = ["get-flight"];
  return useQuery({ queryKey, queryFn: () => getFlight() });
}

export { useGetFlight };
