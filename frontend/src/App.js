import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import initialiseInterceptor from './api/interceptor'
// import 'react-datepicker/dist/react-datepicker.css'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const isLoggedIn = localStorage.getItem('token')

  useEffect(() => {
    initialiseInterceptor()
  }, [])
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <ToastContainer />
        <Routes>
          {isLoggedIn ? (
            <>
              <Route exact path="/login" name="Login Page" element={<Login />} />
              <Route path="*" name="Page 404" element={<Navigate to={'/login'} />} />
            </>
          ) : (
            <>
              <Route path="*" name="Home" element={<DefaultLayout />} />
            </>
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
