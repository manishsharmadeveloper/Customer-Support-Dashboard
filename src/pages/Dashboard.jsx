import React, { useEffect } from "react";

import StatsCards from "../components/dashboard/StatsCards";
import RecentTickets from "../components/dashboard/RecentTickets";
import useTicketStore from "../store/ticketStore";

const Dashboard = () => {
  const fetchTickets = useTicketStore((state) => state.fetchTickets);
  const loading = useTicketStore((state) => state.loading);
  const error = useTicketStore((state) => state.error);
  const tickets = useTicketStore((state) => state.tickets);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-7">
            <div className="h-8 w-64 animate-pulse rounded-lg bg-gray-200" />

            <div className="mt-2 h-4 w-96 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Stats skeleton */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-36 animate-pulse rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="h-4 w-24 rounded bg-gray-200" />
                    <div className="mt-3 h-9 w-16 rounded bg-gray-200" />
                  </div>

                  <div className="h-12 w-12 rounded-xl bg-gray-200" />
                </div>
              </div>
            ))}
          </div>

          {/* Recent tickets skeleton */}
          <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="h-6 w-40 animate-pulse rounded bg-gray-200" />

            <div className="mt-6 space-y-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="h-12 animate-pulse rounded-lg bg-gray-100"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <h2 className="text-lg font-semibold text-red-700">
              Failed to load tickets
            </h2>

            <p className="mt-2 text-sm text-red-600">{error}</p>

            <button
              type="button"
              onClick={fetchTickets}
              className="mt-4 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (tickets.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="mb-7">
            <h1 className="text-2xl font-bold text-gray-900">
              Customer Support
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Monitor and manage your customer support tickets.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-50">
              <svg
                className="h-7 w-7 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 10h8M8 14h5"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2Z"
                />
              </svg>
            </div>

            <h2 className="mt-4 text-lg font-semibold text-gray-900">
              No tickets found
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              There are currently no support tickets.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Customer Support
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Monitor and manage your customer support tickets.
          </p>
        </div>

        {/* Statistics */}
        <StatsCards />

        {/* Recent Tickets */}
        <div className="mt-7">
          <RecentTickets />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
