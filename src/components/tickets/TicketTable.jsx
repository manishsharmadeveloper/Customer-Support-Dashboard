import React from "react";
import {
  ChevronRight,
  Mail,
  Ticket as TicketIcon,
  UserRound,
} from "lucide-react";

import PriorityBadge from "./PriorityBadge";
import StatusBadge from "./StatusBadge";

// =========================================================
// Format Date
// =========================================================
const formatDate = (date) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// =========================================================
// Get Customer Initials
// =========================================================
const getInitials = (name = "") => {
  const cleanName = String(name).trim();

  if (!cleanName) {
    return "?";
  }

  const initials = cleanName
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return initials || "?";
};

// =========================================================
// Ticket Table
// =========================================================
const TicketTable = ({
  tickets = [],
  onStatusChange = () => {},
  onOpenTicket = () => {},
}) => {
  // Always work with an array
  const ticketList = Array.isArray(tickets) ? tickets : [];

  // =======================================================
  // Empty State
  // =======================================================
  if (ticketList.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <TicketIcon className="h-5 w-5 text-gray-400" />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-gray-900">
          No tickets found
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Try changing your search or filter criteria.
        </p>
      </div>
    );
  }

  // =======================================================
  // Main Table
  // =======================================================
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* ===================================================
          DESKTOP TABLE
      ==================================================== */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Ticket
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Customer
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Priority
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Status
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Created
              </th>

              <th
                scope="col"
                className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500"
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {ticketList.map((ticket) => {
              const ticketId = ticket?.id ?? "";

              const customerName = ticket?.customer?.name || "Unknown Customer";

              const customerEmail = ticket?.customer?.email || "No email";

              const subject = ticket?.subject || "No subject";

              const status = ticket?.status || "Open";

              const priority = ticket?.priority || "Low";

              return (
                <tr
                  key={ticketId}
                  onClick={() => onOpenTicket(ticketId)}
                  className="cursor-pointer transition-colors hover:bg-gray-50"
                >
                  {/* =================================================
                      TICKET
                  ================================================== */}
                  <td className="px-6 py-4">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-indigo-600">
                        {ticketId || "—"}
                      </p>

                      <p className="mt-1 max-w-xs truncate text-sm font-semibold text-gray-900">
                        {subject}
                      </p>
                    </div>
                  </td>

                  {/* =================================================
                      CUSTOMER
                  ================================================== */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                        {getInitials(customerName)}
                      </div>

                      {/* Customer Details */}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {customerName}
                        </p>

                        <div className="mt-0.5 flex min-w-0 items-center gap-1 text-xs text-gray-400">
                          <Mail className="h-3 w-3 shrink-0" />

                          <span className="truncate">{customerEmail}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* =================================================
                      PRIORITY
                  ================================================== */}
                  <td className="px-6 py-4">
                    <PriorityBadge priority={priority} />
                  </td>

                  {/* =================================================
                      STATUS
                  ================================================== */}
                  <td
                    className="px-6 py-4"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <select
                      value={status}
                      onChange={(event) => {
                        event.stopPropagation();

                        onStatusChange(ticketId, event.target.value);
                      }}
                      aria-label={`Change status for ticket ${ticketId}`}
                      className="cursor-pointer rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 outline-none transition hover:border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    >
                      <option value="Open">Open</option>

                      <option value="In Progress">In Progress</option>

                      <option value="Resolved">Resolved</option>
                    </select>
                  </td>

                  {/* =================================================
                      CREATED DATE
                  ================================================== */}
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {formatDate(ticket?.createdAt)}
                  </td>

                  {/* =================================================
                      ACTION
                  ================================================== */}
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();

                        onOpenTicket(ticketId);
                      }}
                      aria-label={`Open ticket ${ticketId}`}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* =====================================================
          MOBILE CARDS
      ====================================================== */}
      <div className="divide-y divide-gray-100 md:hidden">
        {ticketList.map((ticket) => {
          const ticketId = ticket?.id ?? "";

          const customerName = ticket?.customer?.name || "Unknown Customer";

          const subject = ticket?.subject || "No subject";

          const status = ticket?.status || "Open";

          const priority = ticket?.priority || "Low";

          return (
            <div
              key={ticketId}
              onClick={() => onOpenTicket(ticketId)}
              className="cursor-pointer p-5 transition-colors hover:bg-gray-50"
            >
              {/* =================================================
                  HEADER
              ================================================== */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-indigo-600">
                    {ticketId || "—"}
                  </p>

                  <h3 className="mt-1 truncate text-sm font-semibold text-gray-900">
                    {subject}
                  </h3>
                </div>

                <ChevronRight className="h-5 w-5 shrink-0 text-gray-400" />
              </div>

              {/* =================================================
                  CUSTOMER
              ================================================== */}
              <div className="mt-4 flex items-center gap-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                  {getInitials(customerName)}
                </div>

                <p className="truncate text-sm font-medium text-gray-700">
                  {customerName}
                </p>
              </div>

              {/* =================================================
                  PRIORITY / STATUS / DATE
              ================================================== */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <PriorityBadge priority={priority} />

                <StatusBadge status={status} />

                <span className="text-xs text-gray-400">
                  {formatDate(ticket?.createdAt)}
                </span>
              </div>

              {/* =================================================
                  STATUS SELECTOR
              ================================================== */}
              <div
                className="mt-4"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <select
                  value={status}
                  onChange={(event) => {
                    event.stopPropagation();

                    onStatusChange(ticketId, event.target.value);
                  }}
                  aria-label={`Change status for ticket ${ticketId}`}
                  className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 outline-none transition hover:border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="Open">Open</option>

                  <option value="In Progress">In Progress</option>

                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketTable;
