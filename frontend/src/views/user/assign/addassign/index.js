import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CFormInput,
  CFormFeedback,
  CFormLabel,
  CInputGroup,
  CRow,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import services from '../../../../services'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
// import { Loading } from '../../../../components'
import { CSpinner } from '@coreui/react'

const Tooltips = () => {
  const { id } = useParams()
  const [formValues, setFormValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'user',
    confirmpassword: '',
  })

  const [validated, setValidated] = useState(false)
  const [loadingStatus, setLoadingStatus] = useState(true)

  const navigate = useNavigate()

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value.trimStart(),
    }))
  }
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const validatePhone = (number) => {
    return /^[1-9][0-9]{9}$/.test(number)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (formValues?.first_name == '') {
      toast.error('Please Enter First Name')
    } else if (formValues?.last_name == '') {
      toast.error('Please Enter Last Name')
    } else if (formValues?.email == '') {
      toast.error('Please Enter Correct Email')
    } else if (!validateEmail(formValues?.email)) {
      toast.error('Please Enter Correct Email')
    } else if (!validatePhone(formValues?.phoneNumber)) {
      toast.error('Please Enter Valid Phone Number')
    } else if (formValues?.password == '') {
      toast.error('Please Enter Password')
    } else if (formValues?.password !== formValues?.confirmpassword) {
      toast.error('Confirm Password does not match ')
    } else {
      if (id) {
        try {
          setLoadingStatus(false)
          await services.assigners.UPDATE_ASSIGNERS(id, formValues)
          toast.success('Update Successfully')
          setLoadingStatus(true)
          navigate('/user')
        } catch (e) {
          console.error(e)
        }
      } else {
        try {
          setLoadingStatus(false)
          await services.assigners.CREATE_ASSIGNERS(formValues)
          toast.success('Create Successfully')
          setLoadingStatus(true)
          navigate('/user')
        } catch (e) {
          toast.error(e?.response?.data?.message || e?.response?.data?.error)
          console.error(e)
        }
      }

      event.preventDefault()
    }

    setValidated(true)
  }

  useEffect(() => {
    if (id) {
      getdatabyid(id)
    }
  }, [id])
  const getdatabyid = async (paramsid) => {
    if (paramsid) {
      try {
        setLoadingStatus(false)
        const response = await services.assigners.GET_ASSIGNERS_BY_ID(paramsid)
        setFormValues({
          email: response?.Data?.email,
          first_name: response?.Data?.first_name,
          last_name: response?.Data?.last_name,
          password: response?.Data?.password,
          phoneNumber: response?.Data?.phoneNumber,
          role: response?.Data?.role,
        })
        setLoadingStatus(true)
      } catch (e) {
        console.error(e)
      }
    }
  }
  return (
    <div>
      {!loadingStatus ? (
        <CSpinner color="primary" />
      ) : (
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardBody>
                <CForm
                  className="row g-3 needs-validation"
                  noValidate
                  // validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="first_name">First Name</CFormLabel>
                    <CInputGroup className="has-validation">
                      <CFormInput
                        type="text"
                        id="first_name"
                        value={formValues.first_name}
                        onChange={handleInputChange}
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <CFormFeedback tooltip invalid>
                        Please Enter First Name.
                      </CFormFeedback>
                    </CInputGroup>
                  </CCol>

                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="last_name">Last Name</CFormLabel>
                    <CInputGroup className="has-validation">
                      <CFormInput
                        type="text"
                        id="last_name"
                        value={formValues.last_name}
                        onChange={handleInputChange}
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <CFormFeedback tooltip invalid>
                        Please Enter Last Name.
                      </CFormFeedback>
                    </CInputGroup>
                  </CCol>

                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="email">Email</CFormLabel>
                    <CFormInput
                      type="text"
                      id="email"
                      value={formValues.email}
                      onChange={handleInputChange}
                      required
                    />
                    <CFormFeedback tooltip invalid>
                      Please Enter Email.
                    </CFormFeedback>
                  </CCol>

                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="phoneNumber">Phone Number</CFormLabel>
                    <CFormInput
                      type="number"
                      id="phoneNumber"
                      value={formValues.phoneNumber}
                      onChange={handleInputChange}
                      required
                      maxLength={10}
                      minLength={10}
                    />
                    <CFormFeedback tooltip invalid>
                      Please enter a 10-digit phone number.
                    </CFormFeedback>
                  </CCol>
                  {!id && (
                    <CCol md={4} className="position-relative">
                      <CFormLabel htmlFor="password">Password</CFormLabel>
                      <CFormInput
                        type="password"
                        id="password"
                        value={formValues.password}
                        onChange={handleInputChange}
                        required
                      />
                      <CFormFeedback tooltip invalid>
                        Please Enter Password.
                      </CFormFeedback>
                    </CCol>
                  )}
                  {!id && (
                    <CCol md={4} className="position-relative">
                      <CFormLabel htmlFor="password">Confirm Password</CFormLabel>
                      <CFormInput
                        type="password"
                        id="confirmpassword"
                        value={formValues.confirmpassword}
                        onChange={handleInputChange}
                        required
                      />
                      <CFormFeedback tooltip invalid>
                        Please Enter Confirm Password.
                      </CFormFeedback>
                    </CCol>
                  )}

                  <CCol xs={12} className="position-relative">
                    <CButton color="primary" onClick={() => navigate('/user')}>
                      Back
                    </CButton>
                    <CButton color="primary" type="submit" style={{ marginLeft: '20px' }}>
                      Submit
                    </CButton>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      )}
    </div>
  )
}
const Index = () => {
  return (
    <>
      <Tooltips />
    </>
  )
}

export default Index
