import { expect, test } from "vitest";
import {
  filterOnSearchedLocation,
  getDateTime,
  orderFlightDataByDateTime,
  processRawFlightData,
} from "./processFlightData";

test("Gives back integer that represents the date time", () => {
  expect(getDateTime("2022-02-23", "14:50")).toBe(1645624200000);
});

test("Gives back an Array of processed flight data", () => {
  const pd = processRawFlightData([
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
      flightIdentifier: "D20190401VY8379",
      flightNumber: "VY 8379",
      airport: "Santiago Com",
      date: "2022-02-22",
      expectedTime: "15:55",
      originalTime: "15:55",
      url: "/en/departures/flight/D20190401VY8379/",
      score: "62.708916",
    },
  ]);

  expect(pd).toStrictEqual([
    {
      dateTime: 1645624200000,
      airport: "San Francisco",
      flightNumber: "UA 969",
    },
    {
      dateTime: 1645541700000,
      airport: "Santiago Com",
      flightNumber: "VY 8379",
    },
  ]);
});
test("Data Sorted from oldest to newest", () => {
  const input = [
    {
      dateTime: 1645624200000,
      airport: "San Francisco",
      flightNumber: "UA 969",
    },
    {
      dateTime: 1645541700000,
      airport: "Santiago Com",
      flightNumber: "VY 8379",
    },
    {
      dateTime: 1645623600000,
      airport: "London Gatwick",
      flightNumber: "BA 2761",
    },
  ];
  const sortedData = orderFlightDataByDateTime(input, "oldest");

  expect(sortedData).toStrictEqual([
    {
      dateTime: 1645541700000,
      airport: "Santiago Com",
      flightNumber: "VY 8379",
    },
    {
      dateTime: 1645623600000,
      airport: "London Gatwick",
      flightNumber: "BA 2761",
    },
    {
      dateTime: 1645624200000,
      airport: "San Francisco",
      flightNumber: "UA 969",
    },
  ]);
});

test("Data Sorted from newest to oldest", () => {
  const input = [
    {
      dateTime: 1645624200000,
      airport: "San Francisco",
      flightNumber: "UA 969",
    },
    {
      dateTime: 1645541700000,
      airport: "Santiago Com",
      flightNumber: "VY 8379",
    },
    {
      dateTime: 1645623600000,
      airport: "London Gatwick",
      flightNumber: "BA 2761",
    },
  ];
  const sortedData = orderFlightDataByDateTime(input, "newest");

  expect(sortedData).toStrictEqual([
    {
      dateTime: 1645624200000,
      airport: "San Francisco",
      flightNumber: "UA 969",
    },
    {
      dateTime: 1645623600000,
      airport: "London Gatwick",
      flightNumber: "BA 2761",
    },
    {
      dateTime: 1645541700000,
      airport: "Santiago Com",
      flightNumber: "VY 8379",
    },
  ]);
});

test("return the searched airport", () => {
  const input = [
    {
      dateTime: 1645624200000,
      airport: "San Francisco",
      flightNumber: "UA 969",
    },
    {
      dateTime: 1645541700000,
      airport: "Santiago Com",
      flightNumber: "VY 8379",
    },
    {
      dateTime: 1645623600000,
      airport: "London Gatwick",
      flightNumber: "BA 2761",
    },
  ];
  const filteredData = filterOnSearchedLocation(input, "Santiago");

  expect(filteredData).toStrictEqual([
    {
      dateTime: 1645541700000,
      airport: "Santiago Com",
      flightNumber: "VY 8379",
    },
  ]);
});

test("return an empty array when search is smaller then 3 characters", () => {
  const input = [
    {
      dateTime: 1645624200000,
      airport: "San Francisco",
      flightNumber: "UA 969",
    },
    {
      dateTime: 1645541700000,
      airport: "Santiago Com",
      flightNumber: "VY 8379",
    },
    {
      dateTime: 1645623600000,
      airport: "London Gatwick",
      flightNumber: "BA 2761",
    },
  ];
  const filteredData = filterOnSearchedLocation(input, "Lo");

  expect(filteredData).toStrictEqual([]);
});

test("return the searched airport Case insensitive", () => {
  const input = [
    {
      dateTime: 1645624200000,
      airport: "San Francisco",
      flightNumber: "UA 969",
    },
    {
      dateTime: 1645541700000,
      airport: "Santiago Com",
      flightNumber: "VY 8379",
    },
    {
      dateTime: 1645623600000,
      airport: "London Gatwick",
      flightNumber: "BA 2761",
    },
  ];
  const filteredData = filterOnSearchedLocation(input, "lond");

  expect(filteredData).toStrictEqual([
    {
      dateTime: 1645623600000,
      airport: "London Gatwick",
      flightNumber: "BA 2761",
    },
  ]);
});
