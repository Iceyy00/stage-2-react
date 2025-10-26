import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ticketService from '../../services/ticketService';
import { AuthContext } from '../../context/AuthContext';

export default function DashboardPage() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState('');
  const { logout, user } = useContext(AuthContext);

  useEffect(() => {
    const res = ticketService.list();
    if (!res.success) {
      setError(res.message || 'Failed to load tickets. Please retry.');
      return;
    }
    setTickets(res.data || []);
  }, []);

  const total = tickets.length;
  const open = tickets.filter((t) => t.status === 'open').length;
  const inProgress = tickets.filter((t) => t.status === 'in_progress').length;
  const closed = tickets.filter((t) => t.status === 'closed').length;

  return (
    <section className="container" aria-labelledby="dashboard-heading">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:16,flexWrap:'wrap'}}>
        <div>
          <h1 id="dashboard-heading" style={{margin:0,fontSize: '1.5rem'}}>Dashboard</h1>
          <p style={{margin:'6px 0 0',color:'#6b7280'}}>Welcome{user?.name ? `, ${user.name}` : ''} — overview of your tickets</p>
        </div>
        <div style={{display:'flex',gap:8}}>
          <Link to="/tickets" className="btn-link" style={{alignSelf:'center',padding:'8px 12px',borderRadius:8}}>Manage Tickets</Link>
          <button onClick={() => logout()} aria-label="Logout">Logout</button>
        </div>
      </div>

      {error && <div className="error" role="alert" style={{marginTop:12}}>{error}</div>}

      <div className="stats-grid" style={{marginTop:18}}>
        <div className="card" role="region" aria-label="Total tickets">
          <h3 style={{margin:'0 0 8px'}}>Total Tickets</h3>
          <p style={{fontSize:24,margin:0,fontWeight:600}}>{total}</p>
        </div>

        <div className="card" role="region" aria-label="Open tickets">
          <h3 style={{margin:'0 0 8px'}}>Open</h3>
          <p style={{margin:0,fontSize:20}}><span className="tag open" aria-hidden="true">{open}</span></p>
        </div>

        <div className="card" role="region" aria-label="In progress tickets">
          <h3 style={{margin:'0 0 8px'}}>In Progress</h3>
          <p style={{margin:0,fontSize:20}}><span className="tag in-progress" aria-hidden="true">{inProgress}</span></p>
        </div>

        <div className="card" role="region" aria-label="Resolved tickets">
          <h3 style={{margin:'0 0 8px'}}>Resolved / Closed</h3>
          <p style={{margin:0,fontSize:20}}><span className="tag closed" aria-hidden="true">{closed}</span></p>
        </div>
      </div>

      <div style={{marginTop:18}}>
        <div className="card">
          <h3 style={{margin:'0 0 12px'}}>Quick Actions</h3>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <Link to="/tickets/new"><button>Create Ticket</button></Link>
            <Link to="/tickets"><button className="secondary" type="button">View Tickets</button></Link>
          </div>
        </div>
      </div>
    </section>
  );
}