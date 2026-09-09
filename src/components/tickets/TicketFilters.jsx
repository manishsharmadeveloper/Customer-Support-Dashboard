import React from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";

const TicketFilters = ({
  search = "",
  setSearch = () => {},
  status = "All",
  setStatus = () => {},
  priority = "All",
  setPriority = () => {},
}) => {
  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
  };

  const searchValue = typeof search === "string" ? search : "";

  const hasFilters =
    searchValue.trim() !== "" || status !== "All" || priority !== "All";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* =====================================================
            SEARCH
        ====================================================== */}
        <div className="relative min-w-0 flex-1">
          <Search
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={searchValue}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
            placeholder="Search tickets, customers, subjects..."
            aria-label="Search tickets, customers, subjects"
            autoComplete="off"
            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* =====================================================
            STATUS FILTER
        ====================================================== */}
        <div className="flex min-w-0 items-center gap-2">
          <SlidersHorizontal
            aria-hidden="true"
            className="hidden h-4 w-4 shrink-0 text-gray-400 sm:block"
          />

          <select
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
            }}
            aria-label="Filter tickets by status"
            className="h-11 w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none transition hover:border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-auto"
          >
            <option value="All">All Status</option>

            <option value="Open">Open</option>

            <option value="In Progress">In Progress</option>

            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* =====================================================
            PRIORITY FILTER
        ====================================================== */}
        <select
          value={priority}
          onChange={(event) => {
            setPriority(event.target.value);
          }}
          aria-label="Filter tickets by priority"
          className="h-11 w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none transition hover:border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100 sm:w-auto"
        >
          <option value="All">All Priority</option>

          <option value="Low">Low</option>

          <option value="Medium">Medium</option>

          <option value="High">High</option>
        </select>

        {/* =====================================================
            CLEAR FILTERS
        ====================================================== */}
        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            aria-label="Clear all ticket filters"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-100 sm:w-auto"
          >
            <X aria-hidden="true" className="h-4 w-4" />
            Clear
          </button>
        )}
      </div>

      {/* =====================================================
          ACTIVE FILTER INFORMATION
      ====================================================== */}
      {hasFilters && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-gray-400">
            Active filters:
          </span>

          {searchValue.trim() !== "" && (
            <span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
              Search: {searchValue}
            </span>
          )}

          {status !== "All" && (
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-600">
              Status: {status}
            </span>
          )}

          {priority !== "All" && (
            <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-600">
              Priority: {priority}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketFilters;
