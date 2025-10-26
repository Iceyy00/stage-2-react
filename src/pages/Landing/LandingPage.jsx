import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <main className="container" aria-labelledby="home-heading">
      <section className="hero card" role="region" aria-label="DomTicket Hero">
        <div className="circle one" aria-hidden="true"></div>
        <div className="circle two" aria-hidden="true"></div>

        <div className="hero-inner">
          <h1 id="home-heading" className="hero__title">DomTicket — Simple, Fast Ticket Management</h1>
          <p className="hero__desc">Create, track and resolve tickets with an elegant, accessible interface. Perfect for demos and small teams.</p>

          <div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:12}}>
            <Link to="/auth/login"><button type="button">Login</button></Link>
            <Link to="/auth/register"><button type="button" className="secondary">Get Started</button></Link>
          </div>
        </div>
      </section>

      <section style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:18}}>
        <div className="card">
          <h3 style={{marginTop:0}}>Secure Pages</h3>
          <p style={{margin:0,color:'#6b7280'}}>Dashboard and Ticket management are protected by a session token in localStorage.</p>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>Local Storage Backend</h3>
          <p style={{margin:0,color:'#6b7280'}}>Tickets and sessions are stored locally for demo purposes.</p>
        </div>
        <div className="card">
          <h3 style={{marginTop:0}}>Responsive Design</h3>
          <p style={{margin:0,color:'#6b7280'}}>Max width 1440px, mobile-first layout and accessible controls.</p>
        </div>
      </section>
    </main>
  );
}