const SESSION_KEY = 'ticketapp_session';
const USERS_KEY = 'ticketapp_users';

function _loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch (e) {
    return [];
  }
}
function _saveUsers(u) {
  localStorage.setItem(USERS_KEY, JSON.stringify(u));
}

function login({ email, password }) {
  const users = _loadUsers();
  const user = users.find((x) => x.email === email && x.password === password);
  if (!user) return { success: false, message: 'Invalid credentials' };
  const token = Math.random().toString(36).slice(2);
  const session = { token, user: { id: user.id, name: user.name, email: user.email } };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, user: session.user };
}

function register({ name, email, password }) {
  const users = _loadUsers();
  if (users.find((u) => u.email === email)) {
    return { success: false, message: 'Email already registered' };
  }
  const newUser = { id: Date.now().toString(), name, email, password };
  users.push(newUser);
  _saveUsers(users);
  const token = Math.random().toString(36).slice(2);
  const session = { token, user: { id: newUser.id, name: newUser.name, email: newUser.email } };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return { success: true, user: session.user };
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
}

function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
  } catch (e) {
    return null;
  }
}

export default { login, register, logout, getSession };