import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="header" role="banner">
      <div className="container" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Link to="/" aria-label="DomTicket home" style={{textDecoration:'none',color:'inherit',display:'flex',alignItems:'center',gap:8}}>
            <div style={{width:40,height:40,borderRadius:8,background:'#0ea5a4',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700}}>DT</div>
            <div>
              <div style={{fontWeight:700}}>DomTicket</div>
              <div style={{fontSize:12,color:'#6b7280'}}>Simple ticket manager</div>
            </div>
          </Link>
        </div>

        <nav aria-label="Main navigation">
          <ul style={{display:'flex',gap:8,listStyle:'none',margin:0,padding:0,alignItems:'center'}}>
            <li><Link to="/dashboard" className="btn-link" style={{textDecoration:'none'}}>Dashboard</Link></li>
            <li><Link to="/tickets" className="btn-link" style={{textDecoration:'none'}}>Tickets</Link></li>
            {!user && (
              <>
                <li><Link to="/auth/login" className="btn-link" style={{textDecoration:'none'}}>Login</Link></li>
                <li><Link to="/auth/register" className="btn-link" style={{textDecoration:'none'}}>Get Started</Link></li>
              </>
            )}
            {user && (
              <>
                <li style={{paddingLeft:8,color:'#374151', textDecoration:'none'}}>Hi, {user.name || user.email}</li>
                <li><button onClick={handleLogout} aria-label="Logout">Logout</button></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}