import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Mail,
  Phone,
  Ticket as TicketIcon,
  UserRound,
} from "lucide-react";

import useTicketStore from "../../store/ticketStore";
import PriorityBadge from "../../components/tickets/PriorityBadge";
import StatusBadge from "../../components/tickets/StatusBadge";

const formatDateTime = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatDate = (date) => {
  if (!date) return "—";

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

const formatTime = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getInitials = (name = "") => {
  const cleanName = String(name).trim();

  if (!cleanName) {
    return "?";
  }

  return cleanName
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const TicketDetails = () => {
  const navigate = useNavigate();
  const { ticketId } = useParams();

  const tickets = useTicketStore((state) => state.tickets);
  const loading = useTicketStore((state) => state.loading);
  const error = useTicketStore((state) => state.error);
  const updateTicketStatus = useTicketStore(
    (state) => state.updateTicketStatus,
  );

  const ticketList = Array.isArray(tickets) ? tickets : [];

  const ticket = ticketList.find(
    (item) => String(item?.id) === String(ticketId),
  );

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;

    try {
      await updateTicketStatus(ticket.id, newStatus);
    } catch (error) {
      console.error("Failed to update ticket status:", error);
    }
  };

  /*
   * Loading state
   */
  if (loading && ticketList.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />

          <p className="mt-4 text-sm text-gray-500">Loading ticket...</p>
        </div>
      </div>
    );
  }

  /*
   * API error
   */
  if (error && ticketList.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-bold text-gray-900">
            Unable to load ticket
          </h1>

          <p className="mt-2 text-sm text-gray-500">{error}</p>

          <button
            onClick={() => navigate("/tickets")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tickets
          </button>
        </div>
      </div>
    );
  }

  /*
   * Ticket not found
   */
  if (!ticket) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <TicketIcon className="h-7 w-7 text-gray-400" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-gray-900">
            Ticket not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            The ticket you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/tickets")}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tickets
          </button>
        </div>
      </div>
    );
  }

  const customer = ticket.customer || {};
  const messages = Array.isArray(ticket.messages) ? ticket.messages : [];

  const customerName = customer.name || "Unknown Customer";

  const customerEmail = customer.email || "No email available";

  const customerPhone = customer.phone || "Not provided";

  const description =
    ticket.description ||
    ticket.subject ||
    "No additional description is available for this ticket.";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate("/tickets")}
          className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tickets
        </button>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              {/* Ticket ID */}
              <span className="text-sm font-semibold text-indigo-600">
                {ticket.id}
              </span>

              {/* Status */}
              <StatusBadge status={ticket.status} />

              {/* Priority */}
              <PriorityBadge priority={ticket.priority} />
            </div>

            <h1 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
              {ticket.subject || "No subject"}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Created {formatDateTime(ticket.createdAt)}
            </p>
          </div>

          {/* Status Selector */}
          <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <label className="mb-1.5 block text-xs font-medium text-gray-500">
              Change Status
            </label>

            <select
              value={ticket.status || "Open"}
              onChange={handleStatusChange}
              className="min-w-45 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 cursor-pointer"
            >
              <option value="Open">Open</option>

              <option value="In Progress">In Progress</option>

              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* =========================
              LEFT COLUMN
          ========================== */}
          <div className="space-y-6 lg:col-span-2">
            {/* Issue Details */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Issue Details
                </h2>
              </div>

              <div className="p-6">
                <h3 className="text-base font-semibold text-gray-900">
                  {ticket.subject || "No subject"}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {description}
                </p>

                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {/* Ticket ID */}
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-400">Ticket ID</p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {ticket.id}
                    </p>
                  </div>

                  {/* Priority */}
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-400">Priority</p>

                    <div className="mt-2">
                      <PriorityBadge priority={ticket.priority} />
                    </div>
                  </div>

                  {/* Created */}
                  <div className="rounded-xl bg-gray-50 p-4">
                    <p className="text-xs text-gray-400">Created</p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {formatDate(ticket.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversation */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Conversation
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Previous messages between customer and support.
                </p>
              </div>

              <div className="space-y-6 p-6">
                {messages.length > 0 ? (
                  messages.map((message, index) => {
                    /*
                     * Your API uses:
                     *
                     * sender: "customer"
                     * sender: "support"
                     *
                     * It does NOT use message.type.
                     */
                    const isCustomer =
                      String(message?.sender || "").toLowerCase() ===
                      "customer";

                    const senderName = message?.sender || "Unknown";

                    const messageText = message?.message || "No message";

                    const messageDate = message?.createdAt;

                    return (
                      <div
                        key={message?.id || `${ticket.id}-message-${index}`}
                        className={`flex gap-3 ${
                          isCustomer ? "" : "flex-row-reverse"
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                            isCustomer
                              ? "bg-gray-100 text-gray-600"
                              : "bg-indigo-100 text-indigo-600"
                          }`}
                        >
                          {getInitials(senderName)}
                        </div>

                        {/* Message Content */}
                        <div
                          className={`flex max-w-[80%] flex-col ${
                            isCustomer ? "items-start" : "items-end"
                          }`}
                        >
                          {/* Sender + Date */}
                          <div className="mb-1 flex items-center gap-2">
                            <p className="text-xs font-semibold text-gray-900">
                              {senderName}
                            </p>

                            <span className="text-[11px] text-gray-400">
                              {formatDateTime(messageDate)}
                            </span>
                          </div>

                          {/* Message Bubble */}
                          <div
                            className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                              isCustomer
                                ? "rounded-tl-sm bg-gray-100 text-gray-700"
                                : "rounded-tr-sm bg-indigo-600 text-white"
                            }`}
                          >
                            {messageText}
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-6 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>

                    <p className="mt-3 text-sm font-medium text-gray-700">
                      No conversation messages
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      No messages are available for this ticket.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =========================
              RIGHT SIDEBAR
          ========================== */}
          <div className="space-y-6">
            {/* Customer Information */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Customer Information
                </h2>
              </div>

              <div className="p-6">
                {/* Customer Header */}
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 font-bold text-indigo-600">
                    {getInitials(customerName)}
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {customerName}
                    </h3>

                    <p className="text-xs text-gray-500">Customer</p>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  {/* Email */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50">
                      <Mail className="h-4 w-4 text-gray-500" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[11px] text-gray-400">Email</p>

                      <p className="truncate text-sm text-gray-700">
                        {customerEmail}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-50">
                      <Phone className="h-4 w-4 text-gray-500" />
                    </div>

                    <div>
                      <p className="text-[11px] text-gray-400">Phone</p>

                      <p className="text-sm text-gray-700">{customerPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Information */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="border-b border-gray-100 px-6 py-4">
                <h2 className="text-sm font-semibold text-gray-900">
                  Ticket Information
                </h2>
              </div>

              <div className="space-y-5 p-6">
                {/* Created Date */}
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 text-gray-400" />

                  <div>
                    <p className="text-[11px] text-gray-400">Created Date</p>

                    <p className="text-sm font-medium text-gray-700">
                      {formatDate(ticket.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Created Time */}
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-400" />

                  <div>
                    <p className="text-[11px] text-gray-400">Created Time</p>

                    <p className="text-sm font-medium text-gray-700">
                      {formatTime(ticket.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Customer */}
                <div className="flex items-center gap-3">
                  <UserRound className="h-4 w-4 text-gray-400" />

                  <div>
                    <p className="text-[11px] text-gray-400">Customer</p>

                    <p className="text-sm font-medium text-gray-700">
                      {customerName}
                    </p>
                  </div>
                </div>

                {/* Current Status */}
                <div className="flex items-center gap-3">
                  <TicketIcon className="h-4 w-4 text-gray-400" />

                  <div>
                    <p className="text-[11px] text-gray-400">Current Status</p>

                    <div className="mt-1">
                      <StatusBadge status={ticket.status} />
                    </div>
                  </div>
                </div>

                {/* Priority */}
                <div className="flex items-center gap-3">
                  <TicketIcon className="h-4 w-4 text-gray-400" />

                  <div>
                    <p className="text-[11px] text-gray-400">Priority</p>

                    <div className="mt-1">
                      <PriorityBadge priority={ticket.priority} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
