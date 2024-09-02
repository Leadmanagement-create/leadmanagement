import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import services from '../../../services'

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    phonenumber: '',
  })
  const handleSubmit = async () => {
    let err = false
    if (!values.name) {
      err = true
      toast.error('Please Enter User Name')
    }
    if (!values.email) {
      err = true
      toast.error('Please Enter Email')
    }
    if (!values.password) {
      err = true
      toast.error('Please Enter Password')
    }
    if (!values.phonenumber) {
      err = true
      toast.error('Please Enter Phone Number')
    }
    const payload = {
      email: values.email,
      password: values.password,
      role: values.name,
      phoneNumber: values.phonenumber,
    }
    if (!err) {
      try {
        await services.auth.REGISTER(payload)
        toast.success('Created')
        navigate('/dashboard')
      } catch (e) {
        console.error(e)
        toast.error('Please Enter Correct Details')
      }
    }
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="User Name"
                      autoComplete="username"
                      value={values.name}
                      onChange={(e) => {
                        setValues((prev) => ({
                          ...prev,
                          name: e.target.value.trimStart(),
                        }))
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      placeholder="Email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => {
                        setValues((prev) => ({
                          ...prev,
                          email: e.target.value.trimStart(),
                        }))
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={values.password}
                      onChange={(e) => {
                        setValues((prev) => ({
                          ...prev,
                          password: e.target.value.trimStart(),
                        }))
                      }}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="number"
                      placeholder="Phone Number"
                      value={values.phonenumber}
                      onChange={(e) => {
                        setValues((prev) => ({
                          ...prev,
                          phonenumber: e.target.value.trimStart(),
                        }))
                      }}
                    />
                  </CInputGroup>
                  <div
                    className="d-flex"
                    style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}
                  >
                    <CButton
                      style={{ color: 'white', backgroundColor: '#5856d6' }}
                      onClick={() => navigate('/login')}
                    >
                      Back
                    </CButton>
                    <CButton
                      style={{ color: 'white', backgroundColor: '#5856d6' }}
                      onClick={handleSubmit}
                    >
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
