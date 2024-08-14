import { useGetFlight } from "../api/flights";
import {
  filterOnSearchedLocation,
  orderFlightDataByDateTime,
  OrderTypes,
  processRawFlightData,
} from "../util/processFlightData";

export default function SearchResults({
  inputSearch,
  sortOrder,
}: {
  inputSearch: string;
  sortOrder: OrderTypes;
}) {
  const { data, isLoading, isError } = useGetFlight();

  if (isLoading) return <span>loading</span>;
  if (isError) {
    return (
      <span>The internet is broke or you forgot to turn on the server :-)</span>
    );
  }
  const filteredData = orderFlightDataByDateTime(
    filterOnSearchedLocation(processRawFlightData(data), inputSearch),
    sortOrder
  );
  if (filteredData.length === 0) {
    return <span>no results found for your search</span>;
  }

  return (
    <ol className="grid grid-cols-[20%_45%_35%]">
      <li className="contents search-row font-bold text-sm md:text-base">
        <div className="py-2">FlightNr</div>
        <div className="py-2">Airport</div>
        <div className="py-2">Departure</div>
      </li>
      {filteredData.map((fd, index) => (
        <li
          key={index}
          className="contents search-row cursor-pointer text-sm md:text-base"
        >
          <div className="flight-nr py-2">{fd.flightNumber}</div>
          <div className="city py-2">{fd.airport}</div>
          <div className="py-2">
            <time dateTime={new Date(fd.dateTime).toISOString()}>
              {new Intl.DateTimeFormat("nl-NL", {
                dateStyle: "short",
                timeStyle: "short",
              }).format(fd.dateTime)}
            </time>
          </div>
        </li>
      ))}
    </ol>
  );
}
