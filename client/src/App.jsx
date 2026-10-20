import { useState } from 'react'
import './App.css'

const initialEmployees = [
  { id: 'EMP001', name: 'Priya Sharma', email: 'priya@staffsync.com', department: 'Human Resources', role: 'HR Executive', status: 'Active' },
  { id: 'EMP002', name: 'Rahul Kumar', email: 'rahul@staffsync.com', department: 'Engineering', role: 'Software Engineer', status: 'Active' },
  { id: 'EMP003', name: 'Ananya Mehta', email: 'ananya@staffsync.com', department: 'Finance', role: 'Accountant', status: 'Active' },
  { id: 'EMP004', name: 'Aman Verma', email: 'aman@staffsync.com', department: 'Engineering', role: 'Team Manager', status: 'Active' },
  { id: 'EMP005', name: 'Sneha Patel', email: 'sneha@staffsync.com', department: 'Marketing', role: 'Marketing Executive', status: 'Inactive' },
]

function App() {
  const [page, setPage] = useState('dashboard')
  const [employees, setEmployees] = useState(initialEmployees)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: 'Engineering',
    role: '',
  })

  const filteredEmployees = employees.filter((employee) =>
    `${employee.name} ${employee.email} ${employee.department} ${employee.role} ${employee.id}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  function handleAddEmployee(event) {
    event.preventDefault()

    const newEmployee = {
      id: `EMP${String(employees.length + 1).padStart(3, '0')}`,
      name: form.name.trim(),
      email: form.email.trim(),
      department: form.department,
      role: form.role.trim(),
      status: 'Active',
    }

    setEmployees([...employees, newEmployee])
    setForm({
      name: '',
      email: '',
      department: 'Engineering',
      role: '',
    })
    setShowForm(false)
  }

  function navigateTo(nextPage) {
    setPage(nextPage)
    window.history.replaceState(null, '', `#${nextPage}`)
  }

  const navItems = [
    { id: 'dashboard', label: '▦ Dashboard' },
    { id: 'employees', label: '♙ Employees' },
    { id: 'attendance', label: '◷ Attendance' },
    { id: 'leaves', label: '▤ Leave Requests' },
    { id: 'training', label: '▣ Training' },
    { id: 'announcements', label: '◉ Announcements' },
  ]

  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="brand">Staff<span>Sync</span></h2>
        <p className="menu-label">WORKSPACE</p>

        <nav>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-item ${page === item.id ? 'active' : ''}`}
              onClick={(event) => {
                event.preventDefault()
                navigateTo(item.id)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="avatar">HR</div>
          <div>
            <strong>HR Admin</strong>
            <p>Administrator</p>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {page === 'dashboard' && (
          <>
            <header className="topbar">
              <div>
                <p className="eyebrow">HUMAN RESOURCES</p>
                <h1>Dashboard</h1>
              </div>
              <div className="topbar-right">
                <span className="today">● System online</span>
                <div className="avatar">HR</div>
              </div>
            </header>

            <section className="welcome">
              <div>
                <p className="eyebrow">STAFFSYNC OVERVIEW</p>
                <h2>Good morning, HR Admin 👋</h2>
                <p>Here's what's happening with your team today.</p>
              </div>
              <div className="welcome-icon">✦</div>
            </section>

            <section className="stats-grid">
              <article className="stat-card">
                <div className="stat-top"><span>Total employees</span><span className="stat-icon purple">♙</span></div>
                <h2>{employees.length}</h2>
                <p className="muted">Employee records</p>
              </article>

              <article className="stat-card">
                <div className="stat-top"><span>Present today</span><span className="stat-icon green">✓</span></div>
                <h2>112</h2>
                <p className="positive">87.5% of employees</p>
              </article>

              <article className="stat-card">
                <div className="stat-top"><span>On leave</span><span className="stat-icon orange">◷</span></div>
                <h2>8</h2>
                <p className="muted">Approved for today</p>
              </article>

              <article className="stat-card">
                <div className="stat-top"><span>Pending requests</span><span className="stat-icon red">▤</span></div>
                <h2>6</h2>
                <p className="muted">Awaiting review</p>
              </article>
            </section>

            <section className="content-grid">
              <article className="panel">
                <div className="panel-heading">
                  <div>
                    <h3>Today's attendance</h3>
                    <p className="muted">Team attendance overview</p>
                  </div>
                  <span className="pill">Today</span>
                </div>

                <div className="attendance-number">
                  <strong>87.5%</strong>
                  <span className="positive">112 of 128 employees</span>
                </div>
                <div className="progress-track"><div className="progress-fill"></div></div>

                <div className="attendance-legend">
                  <span><i className="dot green-dot"></i> Present <strong>112</strong></span>
                  <span><i className="dot orange-dot"></i> On leave <strong>8</strong></span>
                  <span><i className="dot grey-dot"></i> Other <strong>8</strong></span>
                </div>
              </article>

              <article className="panel">
                <div className="panel-heading">
                  <div>
                    <h3>Recent leave requests</h3>
                    <p className="muted">Requests requiring attention</p>
                  </div>
                  <a className="text-link" href="#leaves" onClick={(event) => {
                    event.preventDefault()
                    navigateTo('leaves')
                  }}>View all →</a>
                </div>

                <div className="leave-row">
                  <div className="person-avatar lavender">PS</div>
                  <div className="person-info"><strong>Priya Sharma</strong><p>Casual leave · 2 days</p></div>
                  <span className="status pending">Pending</span>
                </div>
                <div className="leave-row">
                  <div className="person-avatar mint">RK</div>
                  <div className="person-info"><strong>Rahul Kumar</strong><p>Sick leave · 1 day</p></div>
                  <span className="status pending">Pending</span>
                </div>
                <div className="leave-row">
                  <div className="person-avatar peach">AM</div>
                  <div className="person-info"><strong>Ananya Mehta</strong><p>Annual leave · 3 days</p></div>
                  <span className="status approved">Approved</span>
                </div>
              </article>
            </section>

            <section className="panel announcements">
              <div className="panel-heading">
                <div>
                  <h3>Announcements</h3>
                  <p className="muted">Updates for your workplace</p>
                </div>
                <span className="pill">Latest updates</span>
              </div>
              <div className="announcement-item">
                <div className="announcement-icon">✦</div>
                <div>
                  <strong>Welcome to StaffSync</strong>
                  <p className="muted">Your central place for employee management and HR updates.</p>
                </div>
              </div>
            </section>
          </>
        )}

        {page === 'employees' && (
          <>
            <header className="topbar">
              <div>
                <p className="eyebrow">HUMAN RESOURCES</p>
                <h1>Employees</h1>
              </div>
              <div className="topbar-right">
                <span className="today">● System online</span>
                <div className="avatar">HR</div>
              </div>
            </header>

            <section className="employee-welcome">
              <div>
                <h2>Employee Management</h2>
                <p>View, search, and manage your employee records.</p>
              </div>
              <button className="primary-button" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : '+ Add Employee'}
              </button>
            </section>

            {showForm && (
              <section className="panel employee-form-panel">
                <h3>Add a new employee</h3>
                <form className="employee-form" onSubmit={handleAddEmployee}>
                  <label>
                    Full name
                    <input
                      type="text"
                      placeholder="e.g. Neha Singh"
                      value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                      required
                    />
                  </label>

                  <label>
                    Email address
                    <input
                      type="email"
                      placeholder="e.g. neha@staffsync.com"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      required
                    />
                  </label>

                  <label>
                    Department
                    <select
                      value={form.department}
                      onChange={(event) => setForm({ ...form, department: event.target.value })}
                    >
                      <option>Engineering</option>
                      <option>Human Resources</option>
                      <option>Finance</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                      <option>Operations</option>
                    </select>
                  </label>

                  <label>
                    Job role
                    <input
                      type="text"
                      placeholder="e.g. Software Engineer"
                      value={form.role}
                      onChange={(event) => setForm({ ...form, role: event.target.value })}
                      required
                    />
                  </label>

                  <button className="primary-button form-submit" type="submit">
                    Save Employee
                  </button>
                </form>
              </section>
            )}

            <section className="employee-summary">
              <article className="stat-card">
                <p className="muted">Total employees</p>
                <h2>{employees.length}</h2>
              </article>
              <article className="stat-card">
                <p className="muted">Active employees</p>
                <h2>{employees.filter((employee) => employee.status === 'Active').length}</h2>
              </article>
              <article className="stat-card">
                <p className="muted">Departments</p>
                <h2>{new Set(employees.map((employee) => employee.department)).size}</h2>
              </article>
            </section>

            <section className="panel employee-table-panel">
              <div className="panel-heading">
                <div>
                  <h3>All employees</h3>
                  <p className="muted">Search and review employee records</p>
                </div>
                <span className="pill">{filteredEmployees.length} records</span>
              </div>

              <input
                className="employee-search"
                type="search"
                placeholder="Search name, ID, email, role, or department..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <div className="table-scroll">
                <table className="employee-table">
                  <thead>
                    <tr>
                      <th>Employee</th>
                      <th>Employee ID</th>
                      <th>Department</th>
                      <th>Job role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployees.map((employee) => (
                      <tr key={employee.id}>
                        <td>
                          <strong>{employee.name}</strong>
                          <span className="table-email">{employee.email}</span>
                        </td>
                        <td>{employee.id}</td>
                        <td>{employee.department}</td>
                        <td>{employee.role}</td>
                        <td>
                          <span className={`employee-status ${employee.status.toLowerCase()}`}>
                            {employee.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filteredEmployees.length === 0 && (
                      <tr>
                        <td colSpan="5" className="empty-state">
                          No employees found. Try another search.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}

        {!['dashboard', 'employees'].includes(page) && (
          <>
            <header className="topbar">
              <div>
                <p className="eyebrow">HUMAN RESOURCES</p>
                <h1>{navItems.find((item) => item.id === page)?.label.replace(/^[^ ]+ /, '') || 'StaffSync'}</h1>
              </div>
              <div className="topbar-right">
                <span className="today">● System online</span>
                <div className="avatar">HR</div>
              </div>
            </header>
            <section className="panel coming-soon">
              <h2>This section is coming next!</h2>
              <p className="muted">We're building StaffSync one feature at a time. The employee management page is ready to try.</p>
              <button className="primary-button" onClick={() => navigateTo('employees')}>
                Go to Employees
              </button>
            </section>
          </>
        )}

        <footer>StaffSync · Human Resource Management System</footer>
      </main>
    </div>
  )
}

export default App