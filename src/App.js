import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';

export default function App() {
  return (
    <AuthProvider>
      <div className="app-shell">
        <Header />
        <main className="main-content container">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}