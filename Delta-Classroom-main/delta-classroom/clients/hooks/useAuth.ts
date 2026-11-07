import { useState } from 'react';

export function useAuth() {
  const [user] = useState({ id: '1', name: 'Student' });
  return { user, isAuthenticated: true };
}
