import React from "react";
import { ArrowRight, Mail, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";

import StatusBadge from "../tickets/StatusBadge";
import PriorityBadge from "../tickets/PriorityBadge";
import useTicketStore from "../../store/ticketStore";

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

const getInitials = (name = "") => {
  return (
    name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?"
  );
};

const RecentTickets = () => {
  const tickets = useTicketStore((state) => state.tickets);

  const navigate = useNavigate();

  const recentTickets = [...tickets]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const handleOpenTicket = (ticketId) => {
    navigate(`/tickets/${ticketId}`);
  };

  const handleViewAll = () => {
    navigate("/tickets");
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="flex flex-col gap-3 border-b border-gray-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Ticket className="h-5 w-5 text-indigo-600" />

            <h2 className="text-base font-semibold text-gray-900">
              Recent Tickets
            </h2>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Latest customer support requests.
          </p>
        </div>

        <button
          type="button"
          onClick={handleViewAll}
          className="inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-100"
        >
          View all
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* =====================================================
          EMPTY STATE
      ====================================================== */}
      {recentTickets.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <Ticket className="h-5 w-5 text-gray-400" />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-gray-900">
            No recent tickets
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            There are currently no support tickets.
          </p>
        </div>
      ) : (
        <>
          {/* =================================================
              DESKTOP TABLE
          ================================================== */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Ticket
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Customer
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Priority
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Created
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {recentTickets.map((ticket) => {
                  const customerName =
                    ticket.customer?.name || "Unknown Customer";

                  const customerEmail = ticket.customer?.email || "No email";

                  return (
                    <tr
                      key={ticket.id}
                      onClick={() => handleOpenTicket(ticket.id)}
                      className="cursor-pointer transition hover:bg-gray-50"
                    >
                      {/* Ticket */}
                      <td className="px-6 py-4">
                        <p className="text-xs font-semibold text-indigo-600">
                          {ticket.id}
                        </p>

                        <p className="mt-1 max-w-xs truncate text-sm font-semibold text-gray-900">
                          {ticket.subject || "No subject"}
                        </p>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                            {getInitials(customerName)}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium text-gray-900">
                              {customerName}
                            </p>

                            <div className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                              <Mail className="h-3 w-3 shrink-0" />

                              <span className="truncate">{customerEmail}</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="px-6 py-4">
                        <PriorityBadge priority={ticket.priority} />
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <StatusBadge status={ticket.status} />
                      </td>

                      {/* Created */}
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {formatDate(ticket.createdAt)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* =================================================
              MOBILE CARDS
          ================================================== */}
          <div className="divide-y divide-gray-100 md:hidden">
            {recentTickets.map((ticket) => {
              const customerName = ticket.customer?.name || "Unknown Customer";

              return (
                <div
                  key={ticket.id}
                  onClick={() => handleOpenTicket(ticket.id)}
                  className="cursor-pointer p-5 transition hover:bg-gray-50"
                >
                  {/* Ticket Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-indigo-600">
                        {ticket.id}
                      </p>

                      <h3 className="mt-1 truncate text-sm font-semibold text-gray-900">
                        {ticket.subject || "No subject"}
                      </h3>
                    </div>

                    <ArrowRight className="h-4 w-4 shrink-0 text-gray-400" />
                  </div>

                  {/* Customer */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-600">
                      {getInitials(customerName)}
                    </div>

                    <p className="truncate text-sm font-medium text-gray-700">
                      {customerName}
                    </p>
                  </div>

                  {/* Priority / Status / Date */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <PriorityBadge priority={ticket.priority} />

                    <StatusBadge status={ticket.status} />

                    <span className="text-xs text-gray-400">
                      {formatDate(ticket.createdAt)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default RecentTickets;
