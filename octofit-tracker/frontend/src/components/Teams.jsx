import { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load teams');
        return response.json();
      })
      .then((payload) => {
        const items = Array.isArray(payload) ? payload : payload.items || payload.results || payload.data || [];
        if (isMounted) setTeams(items);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Unable to load teams');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <h2 className="h4 fw-semibold mb-3">Teams</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {teams.map((team, index) => (
            <li key={team._id || `${team.name}-${index}`} className="list-group-item px-0">
              <strong>{team.name || 'Untitled team'}</strong>
              <div className="text-muted small">{team.description || 'No description available.'}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
