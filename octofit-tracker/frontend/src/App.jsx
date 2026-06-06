import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiBaseUrl } from './lib/api';

const apiBaseUrl = getApiBaseUrl();

function App() {
  return (
    <main className="container py-4 py-lg-5">
      <header className="mb-4">
        <p className="text-uppercase text-primary fw-semibold mb-2">OctoFit Tracker</p>
        <h1 className="display-6 fw-bold">React 19 presentation tier for the multi-tier fitness app.</h1>
        <p className="lead text-muted mb-3">
          Browse users, teams, activities, workouts, and leaderboard data from the backend API.
        </p>
        <div className="alert alert-info mb-3" role="status">
          API base URL: <strong>{apiBaseUrl}</strong>
        </div>
        <p className="small text-muted mb-0">
          Set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs. If it is not set, the app falls back to localhost.
        </p>
      </header>

      <nav className="nav nav-pills flex-wrap gap-2 mb-4">
        <NavLink to="/" end className="nav-link btn btn-outline-primary">Overview</NavLink>
        <NavLink to="/users" className="nav-link btn btn-outline-primary">Users</NavLink>
        <NavLink to="/teams" className="nav-link btn btn-outline-primary">Teams</NavLink>
        <NavLink to="/activities" className="nav-link btn btn-outline-primary">Activities</NavLink>
        <NavLink to="/leaderboard" className="nav-link btn btn-outline-primary">Leaderboard</NavLink>
        <NavLink to="/workouts" className="nav-link btn btn-outline-primary">Workouts</NavLink>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <section className="row g-4">
              <article className="col-lg-7">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body">
                    <h2 className="h4 fw-semibold mb-3">Overview</h2>
                    <p className="text-muted mb-0">
                      This presentation tier uses React Router, Bootstrap styling, and Vite environment variables to connect to the backend API.
                    </p>
                  </div>
                </div>
              </article>
              <article className="col-lg-5">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body">
                    <h2 className="h4 fw-semibold mb-3">Connected backend</h2>
                    <ul className="mb-0 text-muted">
                      <li>Codespaces URL: <code>https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/…</code></li>
                      <li>Local fallback: <code>http://localhost:8000/api/…</code></li>
                      <li>Supports paginated and array-style API payloads.</li>
                    </ul>
                  </div>
                </div>
              </article>
              <article className="col-12"><Users /></article>
              <article className="col-12"><Teams /></article>
            </section>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  );
}

export default App;
