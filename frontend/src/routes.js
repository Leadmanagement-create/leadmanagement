import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Assign = React.lazy(() => import('./views/user/assign/table/ShowAssign'))

const AssignAdd = React.lazy(() => import('./views/user/assign/addassign'))
const Assignees = React.lazy(() => import('./views/user/assignees/table/ShowAssignees'))
const AssigneesAdd = React.lazy(() => import('./views/user/assignees/addassignees'))
const Lead = React.lazy(() => import('./views/leads/table/ShowLeads'))
const LeadAdd = React.lazy(() => import('./views/leads/addleads'))
const Charts = React.lazy(() => import('./views/charts/Charts'))
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home', element: Dashboard },
  { path: '/*', name: 'Home', element: Dashboard },
  { path: '/user', name: 'User', element: Assign },
  { path: '/useradd', name: 'User', element: AssignAdd },
  { path: '/useradd/:id', name: 'usersEdit', element: AssignAdd },
  { path: '/agent', name: 'Assignees', element: Assignees },
  { path: '/agentadd', name: 'Agent', element: AssigneesAdd },
  { path: '/agentadd/:id', name: 'Agent', element: AssigneesAdd },
  { path: '/lead', name: 'Lead', element: Lead },
  { path: '/leadadd', name: 'Lead', element: LeadAdd },
  { path: '/leadadd/:id', name: 'Lead', element: LeadAdd },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
