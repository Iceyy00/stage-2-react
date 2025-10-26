import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ticketService from '../../services/ticketService';
import { validateTicket } from '../../utils/validators';

export default function TicketForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', status: 'open', description: '', priority: 'medium' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (id) {
      const t = ticketService.getById(id);
      if (!t) {
        setServerError('Ticket not found.');
        return;
      }
      setForm({ title: t.title, status: t.status, description: t.description || '', priority: t.priority || 'medium' });
    }
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const v = validateTicket(form);
    setErrors(v);
    if (Object.keys(v).length) return;
    if (id) {
      const res = ticketService.update(id, form);
      if (!res.success) {
        setServerError(res.message || 'Failed to update.');
        return;
      }
      navigate('/tickets');
    } else {
      const res = ticketService.create(form);
      if (!res.success) {
        setServerError(res.message || 'Failed to create.');
        return;
      }
      navigate('/tickets');
    }
  }

  return (
    <section className="ticket-form-page">
      <h2>{id ? 'Edit Ticket' : 'Create Ticket'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label>Title
          <input name="title" value={form.title} onChange={handleChange} />
          {errors.title && <div className="error">{errors.title}</div>}
        </label>
        <label>Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
          {errors.status && <div className="error">{errors.status}</div>}
        </label>
        <label>Description
          <textarea name="description" value={form.description} onChange={handleChange} />
          {errors.description && <div className="error">{errors.description}</div>}
        </label>
        <label>Priority
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        {serverError && <div className="error">{serverError}</div>}
        <div className="form-actions">
          <button type="submit">{id ? 'Save Changes' : 'Create Ticket'}</button>
          <button type="button" onClick={() => navigate('/tickets')} className="secondary">Cancel</button>
        </div>
      </form>
    </section>
  );
}