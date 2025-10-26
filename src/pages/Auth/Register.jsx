import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setError('Name, email and password are required.');
      return;
    }
    const res = register(form);
    if (!res.success) {
      setError(res.message || 'Registration failed.');
      return;
    }
    navigate('/dashboard');
  }

  return (
    <section className="container auth-page" aria-labelledby="register-heading">
      <h2 id="register-heading">Create an account</h2>
      <form onSubmit={handleSubmit} noValidate style={{maxWidth:480}}>
        <label>Name
          <input name="name" value={form.name} onChange={handleChange} autoComplete="name" />
        </label>

        <label>Email
          <input name="email" value={form.email} onChange={handleChange} autoComplete="email" />
        </label>

        <label>Password
          <input name="password" type="password" value={form.password} onChange={handleChange} autoComplete="new-password" />
        </label>

        {error && <div className="error" role="alert">{error}</div>}

        <div style={{display:'flex',gap:8,marginTop:12}}>
          <button type="submit">Register</button>
          <Link to="/auth/login"><button type="button" className="secondary">Back to Login</button></Link>
        </div>
      </form>
    </section>
  );
}