const TICKETS_KEY = 'ticketapp_tickets';

function _load() {
  try {
    return JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}
function _save(items) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(items));
}

function list() {
  try {
    return { success: true, data: _load() };
  } catch (e) {
    return { success: false, message: 'Failed to load tickets. Please retry.' };
  }
}

function getById(id) {
  const items = _load();
  return items.find((t) => t.id === id) || null;
}

function create(ticket) {
  const items = _load();
  const newTicket = {
    ...ticket,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  items.unshift(newTicket);
  _save(items);
  return { success: true, data: newTicket };
}

function update(id, patch) {
  const items = _load();
  const idx = items.findIndex((t) => t.id === id);
  if (idx === -1) return { success: false, message: 'Ticket not found' };
  items[idx] = { ...items[idx], ...patch, updatedAt: new Date().toISOString() };
  _save(items);
  return { success: true, data: items[idx] };
}

function remove(id) {
  const items = _load();
  const next = items.filter((t) => t.id !== id);
  _save(next);
  return { success: true };
}

export default { list, getById, create, update, remove };