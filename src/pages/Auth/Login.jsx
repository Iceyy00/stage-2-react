import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) {
      setError('Email and password are required.');
      return;
    }
    const res = login(form);
    if (!res.success) {
      setError(res.message || 'Failed to login.');
      return;
    }
    navigate(from);
  }

  return (
    <section className="auth-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Email
          <input name="email" value={form.email} onChange={handleChange} autoComplete="username" />
        </label>
        <label>Password
          <input name="password" type="password" value={form.password} onChange={handleChange} autoComplete="current-password" />
        </label>
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/auth/register">Sign up</Link></p>
    </section>
  );
}