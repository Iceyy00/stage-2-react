import React, { useEffect, useState } from 'react';
import ticketService from '../../services/ticketService';
import { Link, useNavigate } from 'react-router-dom';

function statusClass(status) {
  if (status === 'open') return 'tag open';
  if (status === 'in_progress') return 'tag in-progress';
  return 'tag closed';
}

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const res = ticketService.list();
    if (!res.success) {
      setError(res.message || 'Failed to load tickets. Please retry.');
      return;
    }
    setTickets(res.data);
  }, []);

  function handleDelete(id) {
    if (!window.confirm('Delete this ticket?')) return;
    const res = ticketService.remove(id);
    if (!res.success) {
      setError('Failed to delete ticket.');
      return;
    }
    setTickets((t) => t.filter((x) => x.id !== id));
  }

  return (
    <section className="tickets-page">
      <div className="tickets-header">
        <h2>Tickets</h2>
        <div>
          <button onClick={() => navigate('/tickets/new')}>Create Ticket</button>
          <Link to="/dashboard" className="btn-link">Back to Dashboard</Link>
        </div>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="tickets-grid">
        {tickets.length === 0 && <div className="card">No tickets yet.</div>}
        {tickets.map((t) => (
          <div key={t.id} className="card ticket-card">
            <div className="card-header">
              <h3>{t.title}</h3>
              <span className={statusClass(t.status)}>{t.status}</span>
            </div>
            <p>{t.description}</p>
            <div className="card-actions">
              <button onClick={() => navigate(`/tickets/${t.id}/edit`)}>Edit</button>
              <button onClick={() => handleDelete(t.id)} className="danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}