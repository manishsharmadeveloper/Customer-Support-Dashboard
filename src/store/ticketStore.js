import { create } from "zustand";

const API_URL = import.meta.env.VITE_API_URL;

const useTicketStore = create((set) => ({
  tickets: [],
  loading: false,
  error: null,

  fetchTickets: async () => {
    set({
      loading: true,
      error: null,
    });

    try {
      if (!API_URL) {
        throw new Error(
          "VITE_API_URL is missing. Check your .env file."
        );
      }

      console.log("Fetching tickets from:", API_URL);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(
          `API request failed with status ${response.status}`
        );
      }

      const contentType =
        response.headers.get("content-type") || "";

      if (!contentType.includes("application/json")) {
        throw new Error(
          "API did not return JSON. Check VITE_API_URL."
        );
      }

      const data = await response.json();

      console.log("API response:", data);

      const tickets = Array.isArray(data)
        ? data
        : Array.isArray(data.tickets)
          ? data.tickets
          : [];

      set({
        tickets,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("fetchTickets error:", error);

      set({
        loading: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch tickets.",
      });
    }
  },

  updateTicketStatus: async (ticketId, newStatus) => {
    try {
      if (!API_URL) {
        throw new Error("VITE_API_URL is missing.");
      }

      const response = await fetch(
        `${API_URL}/${ticketId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to update ticket (${response.status})`
        );
      }

      set((state) => ({
        tickets: state.tickets.map((ticket) =>
          String(ticket.id) === String(ticketId)
            ? {
                ...ticket,
                status: newStatus,
              }
            : ticket
        ),
      }));
    } catch (error) {
      console.error("updateTicketStatus error:", error);

      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to update ticket status.",
      });

      throw error;
    }
  },
}));

export default useTicketStore;