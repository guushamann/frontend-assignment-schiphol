import { useState } from "react";
import SearchResults from "./SearchResults";
import { OrderTypes } from "../util/processFlightData";
function onChangeInput(input: string) {
  return input.length > 2 ? input : "";
}
export function Search() {
  const [inputSearch, setInputSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<OrderTypes>("oldest");
  return (
    <div className="searchbox border flex flex-col m-2 sm:m-5 w-full md:w-4/5 lg:w-2/5  min-h-96">
      <header className="p-2 sm:p-5">
        <h1 className="text-2xl md:text-4xl p-4 font-bold uppercase ">
          Search for a flight
        </h1>

        <input
          onChange={(e) => setInputSearch(onChangeInput(e.target.value))}
          type="text"
          placeholder="Try to search for a city"
          className="input-search w-full p-2 sm:p-5 placeholder: text-center placeholder: text-xl border focus:outline-none focus:ring-1  focus:border-sky-500"
        />
      </header>
      {inputSearch && (
        <main className="bg-white opacity-80">
          <menu className="text-sm flex justify-center gap-2">
            <li>
              <a
                className={`cursor-pointer ${
                  sortOrder === "newest" ? "underline" : "font-bold"
                }`}
                href="#"
                onClick={() => setSortOrder("oldest")}
              >
                Early
              </a>
            </li>
            <li>
              <a
                className={`cursor-pointer ${
                  sortOrder === "oldest" ? "underline" : "font-bold"
                }`}
                href="#"
                onClick={() => setSortOrder("newest")}
              >
                Late
              </a>
            </li>
          </menu>
          <section className="text-xl text-left  p-2 sm:p-5 w-full">
            <SearchResults inputSearch={inputSearch} sortOrder={sortOrder} />
          </section>
        </main>
      )}
    </div>
  );
}
