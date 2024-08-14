// types for flight data
type RawFlightData = {
  flightIdentifier: string;
  flightNumber: string;
  airport: string;
  date: string;
  expectedTime: string;
  originalTime: string;
  url: string;
  score: string;
};

type FlightData = {
  dateTime: number;
  airport: string;
  flightNumber: string;
};
export type OrderTypes = "newest" | "oldest";

/**
 * function to create a real date in the form of a number so that we can calculate with it
 */
export function getDateTime(dateString: string, timeString: string) {
  return new Date(`${dateString}T${timeString}`).getTime();
}

/**
 * transform function for the raw flight data
 */
export function processRawFlightData(rawFlightData: RawFlightData[]) {
  return rawFlightData.map((fd) => {
    return {
      dateTime: getDateTime(fd.date, fd.expectedTime),
      airport: fd.airport,
      flightNumber: fd.flightNumber,
    };
  });
}

/**
 * order function for the flight data
 */
export function orderFlightDataByDateTime(
  flightData: FlightData[],
  order: OrderTypes
) {
  if (order === "oldest") {
    return [...flightData].sort((a, b) => a.dateTime - b.dateTime);
  }
  return [...flightData].sort((a, b) => b.dateTime - a.dateTime);
}

/**
 * filter function for the flight data
 */
export function filterOnSearchedLocation(
  flightData: FlightData[],
  search: string
) {
  if (search.length < 3) return [];

  return flightData.filter((fd) =>
    fd.airport.toLowerCase().includes(search.toLowerCase())
  );
}
