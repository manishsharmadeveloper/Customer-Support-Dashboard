import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import TicketList from "./pages/tickets/TicketList";
import TicketDetails from "./pages/tickets/TicketDetails";

import useTicketStore from "./store/ticketStore";

const App = () => {
  const fetchTickets = useTicketStore((state) => state.fetchTickets);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/tickets" element={<TicketList />} />

        <Route path="/tickets/:ticketId" element={<TicketDetails />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
