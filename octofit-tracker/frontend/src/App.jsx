import './App.css'

function App() {
  return (
    <main className="container py-5">
      <section className="row align-items-center g-4">
        <div className="col-lg-8">
          <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
          <h1 className="display-5 fw-bold">A modern fitness dashboard for students and coaches.</h1>
          <p className="lead text-muted">
            Track workouts, compare team progress, and keep motivation high through a clean multi-tier app.
          </p>
          <div className="d-flex gap-3">
            <button className="btn btn-primary btn-lg">Start tracking</button>
            <button className="btn btn-outline-secondary btn-lg">View leaderboard</button>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h5 fw-semibold">Current status</h2>
              <ul className="list-unstyled mb-0 mt-3 text-muted">
                <li>Frontend: React 19 + Vite</li>
                <li>Backend: Express + TypeScript</li>
                <li>Data: MongoDB + Mongoose</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
