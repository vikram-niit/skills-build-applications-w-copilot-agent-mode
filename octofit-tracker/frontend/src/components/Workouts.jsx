import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    fetchCollection('workouts')
      .then((items) => {
        if (isMounted) setWorkouts(items);
      })
      .catch((err) => {
        if (isMounted) setError(err.message || 'Unable to load workouts');
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0 h-100">
      <div className="card-body">
        <h2 className="h4 fw-semibold mb-3">Suggested Workouts</h2>
        {error ? <p className="text-danger">{error}</p> : null}
        <ul className="list-group list-group-flush">
          {workouts.map((workout, index) => (
            <li key={workout._id || `${workout.name}-${index}`} className="list-group-item px-0">
              <strong>{workout.name || 'Workout suggestion'}</strong>
              <div className="text-muted small">{workout.description || 'A fresh routine for your next session.'}</div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
