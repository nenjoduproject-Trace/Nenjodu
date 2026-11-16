export default function Admin() {
  return (
    <div className="page">

      <div className="page-heading">

        <span className="section-label">
          Admin
        </span>

        <h1>Admin Dashboard</h1>

        <p>
          Manage Islamic content and platform data.
        </p>

      </div>


      <div className="dashboard-grid">

        <div className="dashboard-card">
          <span>📚</span>
          <strong>1,250</strong>
          <small>Articles</small>
        </div>

        <div className="dashboard-card">
          <span>📖</span>
          <strong>114</strong>
          <small>Surahs</small>
        </div>

        <div className="dashboard-card">
          <span>💬</span>
          <strong>532</strong>
          <small>Questions</small>
        </div>

        <div className="dashboard-card">
          <span>👥</span>
          <strong>4,820</strong>
          <small>Users</small>
        </div>

      </div>

    </div>
  );
}