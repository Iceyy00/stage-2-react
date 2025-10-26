import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="container" role="contentinfo" style={{marginTop:24, paddingTop:16, paddingBottom:24}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12,flexWrap:'wrap'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <div style={{width:36,height:36,borderRadius:8,background:'#0ea5a4',display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',fontWeight:700}}>DT</div>
          <div>
            <div style={{fontWeight:700}}>DomTicket</div>
            <div style={{fontSize:12,color:'#6b7280'}}>Built with accessibility in mind</div>
          </div>
        </div>
        <nav aria-label="footer">
          <ul style={{display:'flex',gap:12,listStyle:'none',margin:0,padding:0}}>
            <li><Link to="/" style={{textDecoration:'none', color:'inherit'}}>Home</Link></li>
            <li><Link to="/auth/login" style={{textDecoration:'none', color:'inherit'}}>Login</Link></li>
            <li><Link to="/auth/register" style={{textDecoration:'none', color:'inherit'}}>Register</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}