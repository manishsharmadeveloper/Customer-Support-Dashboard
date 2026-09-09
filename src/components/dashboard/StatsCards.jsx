import React from "react";
import {
  Ticket,
  CircleAlert,
  LoaderCircle,
  CircleCheck,
  ArrowUpRight,
} from "lucide-react";

import useTicketStore from "../../store/ticketStore";

const StatsCards = () => {
  const tickets = useTicketStore(
    (state) => state.tickets,
  );

  const loading = useTicketStore(
    (state) => state.loading,
  );

  const error = useTicketStore(
    (state) => state.error,
  );

  // =========================================================
  // Loading State
  // =========================================================
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="h-4 w-24 rounded bg-gray-200" />

                <div className="h-9 w-16 rounded bg-gray-200" />
              </div>

              <div className="h-12 w-12 rounded-xl bg-gray-200" />
            </div>

            <div className="mt-5 h-6 w-32 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    );
  }

  // =========================================================
  // Error State
  // =========================================================
  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-100">
            <CircleAlert className="h-5 w-5 text-red-600" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-red-700">
              Unable to load ticket statistics
            </h3>

            <p className="mt-1 text-sm leading-5 text-red-600">
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // Empty State
  // =========================================================
  if (!Array.isArray(tickets) || tickets.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
          <Ticket className="h-6 w-6 text-gray-400" />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-gray-900">
          No tickets available
        </h3>

        <p className="mt-1 text-sm leading-5 text-gray-500">
          Ticket statistics will appear here once
          tickets are available.
        </p>
      </div>
    );
  }

  // =========================================================
  // Calculate Statistics
  // =========================================================
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket?.status === "Open",
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket?.status === "In Progress",
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket?.status === "Resolved",
  ).length;

  const stats = [
    {
      title: "Total Tickets",
      value: totalTickets,
      icon: Ticket,
      iconBg: "bg-indigo-50",
      iconColor: "text-indigo-600",
      accent: "bg-indigo-600",
    },
    {
      title: "Open",
      value: openTickets,
      icon: CircleAlert,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
      accent: "bg-orange-500",
    },
    {
      title: "In Progress",
      value: inProgressTickets,
      icon: LoaderCircle,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
      accent: "bg-blue-500",
    },
    {
      title: "Resolved",
      value: resolvedTickets,
      icon: CircleCheck,
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-600",
      accent: "bg-emerald-500",
    },
  ];

  // =========================================================
  // Statistics Cards
  // =========================================================
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group relative cursor-default overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg"
          >
            {/* Top Section */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                  {stat.value.toLocaleString("en-IN")}
                </h2>
              </div>

              {/* Icon */}
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${stat.iconBg} transition-transform duration-300 group-hover:scale-110`}
              >
                <Icon
                  className={`h-6 w-6 ${stat.iconColor}`}
                />
              </div>
            </div>

            {/* Bottom Information */}
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500">
                <ArrowUpRight className="h-3 w-3" />

                Current
              </span>

              <span className="text-xs text-gray-400">
                from ticket data
              </span>
            </div>

            {/* Hover Accent */}
            <div
              className={`absolute bottom-0 left-0 h-1 w-0 ${stat.accent} transition-all duration-300 group-hover:w-full`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;