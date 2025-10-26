import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/Landing/LandingPage';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import DashboardPage from '../pages/Dashboard/DashboardPage';
import TicketList from '../pages/Tickets/TicketList';
import TicketForm from '../pages/Tickets/TicketForm';
import ProtectedRoute from '../components/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets"
        element={
          <ProtectedRoute>
            <TicketList />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets/new"
        element={
          <ProtectedRoute>
            <TicketForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tickets/:id/edit"
        element={
          <ProtectedRoute>
            <TicketForm />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}