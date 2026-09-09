import React, { useMemo, useState } from "react";
import {
  AlertCircle,
  Plus,
  RefreshCw,
  Ticket as TicketIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import TicketFilters from "../../components/tickets/TicketFilters";
import TicketTable from "../../components/tickets/TicketTable";
import useTicketStore from "../../store/ticketStore";

const TicketList = () => {
  const navigate = useNavigate();

  // =========================================================
  // Zustand State
  // =========================================================
  const tickets = useTicketStore((state) => state.tickets);

  const loading = useTicketStore((state) => state.loading);

  const error = useTicketStore((state) => state.error);

  // =========================================================
  // Zustand Actions
  // =========================================================
  const updateTicketStatus = useTicketStore(
    (state) => state.updateTicketStatus,
  );

  const fetchTickets = useTicketStore((state) => state.fetchTickets);

  // =========================================================
  // Filter State
  // =========================================================
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  // =========================================================
  // Make Sure Tickets Is Always An Array
  // =========================================================
  const ticketList = Array.isArray(tickets) ? tickets : [];

  // =========================================================
  // Filter Tickets
  // =========================================================
  const filteredTickets = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return ticketList.filter((ticket) => {
      const customerName = ticket?.customer?.name?.toLowerCase() || "";

      const customerEmail = ticket?.customer?.email?.toLowerCase() || "";

      const subject = ticket?.subject?.toLowerCase() || "";

      const ticketId = String(ticket?.id || "").toLowerCase();

      // Search
      const matchesSearch =
        searchValue === "" ||
        customerName.includes(searchValue) ||
        customerEmail.includes(searchValue) ||
        subject.includes(searchValue) ||
        ticketId.includes(searchValue);

      // Status
      const matchesStatus = status === "All" || ticket?.status === status;

      // Priority
      const matchesPriority =
        priority === "All" || ticket?.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [ticketList, search, status, priority]);

  // =========================================================
  // Clear Filters
  // =========================================================
  const clearFilters = () => {
    setSearch("");
    setStatus("All");
    setPriority("All");
  };

  // =========================================================
  // Change Ticket Status
  // =========================================================
  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      await updateTicketStatus(ticketId, newStatus);
    } catch (error) {
      console.error("Failed to update ticket status:", error);
    }
  };

  // =========================================================
  // Open Ticket Details
  // =========================================================
  const handleOpenTicket = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  // =========================================================
  // Create Ticket
  // =========================================================
  const handleCreateTicket = () => {
    navigate("/tickets/create");
  };

  // =========================================================
  // Loading State
  // =========================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="h-8 w-52 animate-pulse rounded-lg bg-gray-200" />

              <div className="mt-2 h-4 w-80 animate-pulse rounded bg-gray-200" />
            </div>

            <div className="h-11 w-36 animate-pulse rounded-xl bg-gray-200" />
          </div>

          {/* Filter Skeleton */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="h-11 flex-1 animate-pulse rounded-xl bg-gray-200" />

              <div className="h-11 w-full animate-pulse rounded-xl bg-gray-200 sm:w-36" />

              <div className="h-11 w-full animate-pulse rounded-xl bg-gray-200 sm:w-36" />
            </div>
          </div>

          {/* Loading Box */}
          <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-10 shadow-sm">
            <div className="flex items-center justify-center gap-3 text-sm text-gray-500">
              <RefreshCw className="h-5 w-5 animate-spin" />
              Loading tickets...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // Error State
  // =========================================================
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto flex min-h-125 max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 text-center shadow-sm">
            {/* Error Icon */}
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>

            {/* Title */}
            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              Unable to load tickets
            </h2>

            {/* Error */}
            <p className="mt-2 text-sm leading-6 text-gray-500">{error}</p>

            {/* Retry */}
            <button
              type="button"
              onClick={fetchTickets}
              disabled={loading}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
              />

              {loading ? "Retrying..." : "Try Again"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // Main UI
  // =========================================================
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* ===================================================
            HEADER
        ==================================================== */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <TicketIcon className="h-6 w-6 text-indigo-600" />

              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Support Tickets
              </h1>
            </div>

            <p className="mt-1 text-sm text-gray-500">
              Manage and respond to customer support requests.
            </p>
          </div>

          {/* Create Ticket */}
          <button
            type="button"
            onClick={handleCreateTicket}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-200"
          >
            <Plus className="h-4 w-4" />
            Create Ticket
          </button>
        </div>

        {/* ===================================================
            FILTERS
        ==================================================== */}
        <TicketFilters
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
        />

        {/* ===================================================
            RESULT COUNT
        ==================================================== */}
        <div className="my-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredTickets.length}
            </span>{" "}
            {filteredTickets.length === 1 ? "ticket" : "tickets"}
          </p>

          {(search.trim() !== "" || status !== "All" || priority !== "All") && (
            <button
              type="button"
              onClick={clearFilters}
              className="self-start text-xs font-medium text-indigo-600 transition hover:text-indigo-700 sm:self-auto"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* ===================================================
            EMPTY SEARCH/FILTER RESULT
        ==================================================== */}
        {filteredTickets.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
              <TicketIcon className="h-7 w-7 text-gray-400" />
            </div>

            <h2 className="mt-4 text-base font-semibold text-gray-900">
              No tickets found
            </h2>

            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-gray-500">
              {ticketList.length === 0
                ? "There are currently no support tickets."
                : "No tickets match your current search and filter criteria."}
            </p>

            {ticketList.length > 0 &&
              (search.trim() !== "" ||
                status !== "All" ||
                priority !== "All") && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                >
                  Clear Filters
                </button>
              )}
          </div>
        ) : (
          /* =================================================
             TICKET TABLE
          ================================================== */
          <TicketTable
            tickets={filteredTickets}
            onStatusChange={handleStatusChange}
            onOpenTicket={handleOpenTicket}
          />
        )}
      </div>
    </div>
  );
};

export default TicketList;
