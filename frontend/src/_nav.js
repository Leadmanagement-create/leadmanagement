import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
const role = JSON.parse(localStorage?.getItem('user'))?.role
const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      // text: 'NEW',
    },
  },

  {
    component: CNavTitle,
    name: 'User',
  },

  {
    component: CNavItem,
    name: 'Leads',
    to: '/lead',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Agents',
    to: '/agent',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Templates',
    to: '/templates',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },

  {
    component: CNavItem,
    name: 'Campaign',
    to: '/campaign',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  },
]
if (role === 'admin') {
  _nav.push({
    component: CNavItem,
    name: 'Users',
    to: '/user',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  })
}
export default _nav
