import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load leaderboard');
        return response.json();
      })
      .then((payload) => {
        const items = Array.isArray(payload) ? payload : payload.items || payload.results || payload.data || [];
        if (isMounted) setEntries(items);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Unable to load leaderboard');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <h2 className="h4 fw-semibold mb-3">Leaderboard</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ol className="mb-0 ps-3">
          {entries.map((entry, index) => (
            <li key={entry._id || `${entry.name}-${index}`} className="mb-2">
              <strong>{entry.name || `Rank ${index + 1}`}</strong>
              <span className="text-muted"> — {entry.points ?? entry.score ?? '0'} pts</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
