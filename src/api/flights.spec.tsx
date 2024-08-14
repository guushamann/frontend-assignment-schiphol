import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetFlight } from "./flights";
import { expect, test, vi } from "vitest";

const data = [
  {
    flightIdentifier: "D20190401UA969",
    flightNumber: "UA 969",
    airport: "San Francisco",
    date: "2022-02-23",
    expectedTime: "14:50",
    originalTime: "14:50",
    url: "/en/departures/flight/D20190401UA969/",
    score: "70.55272",
  },
  {
    flightIdentifier: "D20190401UA989",
    flightNumber: "UA 989",
    airport: "San Francisco",
    date: "2022-02-24",
    expectedTime: "14:50",
    originalTime: "14:50",
    url: "/en/departures/flight/D20190401UA989/",
    score: "71.53476",
  },
];

test("test fetch and react query", async () => {
  vi.spyOn(globalThis, "fetch").mockResolvedValue({
    ok: true,
    statusText: "OK",
    json: async () => data,
  } as Response);

  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  const { result } = renderHook(() => useGetFlight(), { wrapper });
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual(data);
});

test("test fetch and react query when server is offline", async () => {
  vi.spyOn(globalThis, "fetch").mockImplementation(() => {
    throw new Error("offline");
  });

  const queryClient = new QueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  const { result } = renderHook(() => useGetFlight(), { wrapper });
  await waitFor(() => expect(result.current.isError).toBe(false));
});
