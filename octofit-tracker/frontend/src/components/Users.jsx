import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
      : 'http://localhost:8000/api/users/';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load users');
        return response.json();
      })
      .then((payload) => {
        const items = Array.isArray(payload) ? payload : payload.items || payload.results || payload.data || [];
        if (isMounted) setUsers(items);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Unable to load users');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <h2 className="h4 fw-semibold mb-3">Users</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {users.map((user, index) => (
            <li key={user._id || `${user.name}-${index}`} className="list-group-item px-0">
              <strong>{user.name || 'Unknown user'}</strong>
              <div className="text-muted small">{user.email || 'No email on file'}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
