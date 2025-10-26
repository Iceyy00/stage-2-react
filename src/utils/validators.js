export function validateTicket(payload) {
  const errors = {};
  if (!payload.title || !payload.title.trim()) {
    errors.title = 'Title is required.';
  } else if (payload.title.length > 120) {
    errors.title = 'Title must be 120 characters or less.';
  }

  const allowed = ['open', 'in_progress', 'closed'];
  if (!payload.status || !allowed.includes(payload.status)) {
    errors.status = 'Status must be one of: open, in_progress, closed.';
  }

  if (payload.description && payload.description.length > 2000) {
    errors.description = 'Description is too long.';
  }

  if (payload.priority && !['low', 'medium', 'high'].includes(payload.priority)) {
    errors.priority = 'Invalid priority.';
  }

  return errors;
}