import { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const apiUrl = import.meta.env.VITE_CODESPACE_NAME
      ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load activities');
        return response.json();
      })
      .then((payload) => {
        const items = Array.isArray(payload) ? payload : payload.items || payload.results || payload.data || [];
        if (isMounted) setActivities(items);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Unable to load activities');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <h2 className="h4 fw-semibold mb-3">Recent Activities</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {activities.map((activity, index) => (
            <li key={activity._id || `${activity.type}-${index}`} className="list-group-item px-0">
              <strong>{activity.type || 'Activity'}</strong>
              <div className="text-muted small">{activity.description || 'No details provided.'}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
