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
import services from '../../../services'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import moment from 'moment'
import { CSpinner } from '@coreui/react'
// import { Loading } from '../../../components'
import { useSelector } from 'react-redux'

const Tooltips = () => {
  const { id } = useParams()
  const [formValues, setFormValues] = useState({
    name: '',
    emailAddress: '',
    phoneNumber: '',
    source: '',
    dateDiscovered: '',
    businessType: '',
    ageOfBusiness: '',
    currentProcessor: '',
    timeframeToSwitch: '',
    contactReason: '',
  })
  const [validated, setValidated] = useState(false)
  const [dataValue, setDataValue] = useState()
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [assignees, setAssignees] = useState([])
  const [riskLevel] = useState([
    {
      label: 'High',
      value: 'HIGH',
      color: 'blue',
    },
    {
      label: 'Medium',
      value: 'MEDIUM',
      color: 'blue',
    },
    {
      label: 'Low',
      value: 'LOW',
      color: 'blue',
    },
  ])
  const [selectedOption, setSelectedOption] = useState(null)
  const [selectedRisk, setSelectedRisk] = useState(null)
  const [interestLevel, setInterestLevel] = useState(null)
  const navigate = useNavigate()
  const storedTheme = useSelector((state) => state.theme)
  const colourStyles = {
    option: (styles) => ({
      ...styles,
      backgroundColor: storedTheme === 'dark' ? '#212631' : styles.backgroundColor,
      color: storedTheme === 'dark' ? 'white' : styles.color,
    }),
    control: (styles) => ({
      ...styles,
      backgroundColor: storedTheme === 'dark' ? '#212631' : styles.backgroundColor,
      color: storedTheme === 'dark' ? 'white' : styles.color,
    }),
    singleValue: (styles) => ({
      ...styles,
      color: storedTheme === 'dark' ? 'white' : styles.color,
    }),
  }

  const handleInputChange = (event) => {
    const { id, value } = event.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    if (form.checkValidity() === false) {
      // event.stopPropagation()
    } else {
      if (id) {
        if (selectedOption?.value) {
          const payload = {
            ...formValues,
            riskLevel: selectedRisk?.value,
            interestLevel: interestLevel?.value,
            assigneeId: selectedOption?.value,
          }
          try {
            setLoadingStatus(false)
            await services.lead.UPDATE_LEAD(id, payload)
            setLoadingStatus(true)
            toast.success('Update Successfully')
            navigate('/lead')
          } catch (e) {
            console.error(e)
          }
        } else {
          toast.warn('Please Select Assignees')
        }
      } else {
        try {
          setLoadingStatus(false)
          await services.lead.CREATE_LEAD(formValues)
          setLoadingStatus(true)
          toast.success('Create Successfully')
          navigate('/lead')
        } catch (e) {
          console.error(e)
        }
      }
    }
    setValidated(true)
  }

  useEffect(() => {
    if (id) {
      getAllUser()
    }
  }, [id])
  const getdatabyid = async (paramsid, assigneesData) => {
    if (paramsid) {
      try {
        setLoadingStatus(false)
        const response = await services.lead.GET_LEAD_BY_ID(paramsid)

        setDataValue(response?.Data)
        if (response?.Data?.assigneeId) {
          const findAssignees = assigneesData?.find((i) => i.value == response?.Data?.assigneeId)
          setSelectedOption(findAssignees)
        }
        setFormValues({
          name: response?.Data?.name,
          emailAddress: response?.Data?.emailAddress,
          phoneNumber: response?.Data?.phoneNumber,
          source: response?.Data?.source,
          dateDiscovered: response?.Data?.dateDiscovered?.split('T')[0],
          businessType: response?.Data?.businessType,
          ageOfBusiness: response?.Data?.ageOfBusiness,
          currentProcessor: response?.Data?.currentProcessor,
          timeframeToSwitch: response?.Data?.timeframeToSwitch,
          contactReason: response?.Data?.contactReason,
        })
        riskLevel.map((item) => {
          if (item.value == response.Data.riskLevel) {
            setSelectedRisk(item)
          }
          if (item.value == response.Data.interestLevel) {
            setInterestLevel(item)
          }
        })
        setLoadingStatus(true)
      } catch (e) {
        console.error(e)
      }
    }
  }

  const getAllUser = async () => {
    try {
      setLoadingStatus(false)
      const { data } = await services.assigners.GET_ALL_ASSIGNERS('assignees')
      const transformedData = data.map((element) => ({
        label: element?.first_name + ' ' + element?.last_name,
        value: element?._id,
        color: 'blue',
      }))
      setAssignees(transformedData)
      getdatabyid(id, transformedData)
    } catch (e) {
      console.error(e)
    }
  }

  const handleChange = (option) => {
    setSelectedOption(option)
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
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="name">Name</CFormLabel>
                    <CInputGroup className="has-validation">
                      <CFormInput
                        type="text"
                        id="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        aria-describedby="inputGroupPrepend"
                        required
                        // disabled={id ? true : false}
                      />
                      <CFormFeedback tooltip invalid>
                        Please Enter Name.
                      </CFormFeedback>
                    </CInputGroup>
                  </CCol>
                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="emailAddress">Email</CFormLabel>
                    <CFormInput
                      type="text"
                      id="emailAddress"
                      value={formValues.emailAddress}
                      onChange={handleInputChange}
                      required
                      // disabled={id ? true : false}
                    />
                    <CFormFeedback tooltip invalid>
                      Please Enter Email.
                    </CFormFeedback>
                  </CCol>
                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="businessType">Business Type</CFormLabel>
                    <CFormInput
                      type="text"
                      id="businessType"
                      value={formValues.businessType}
                      onChange={handleInputChange}
                      required
                      // disabled={id ? true : false}
                    />
                    <CFormFeedback tooltip invalid>
                      Please Enter Business Type
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
                      // disabled={id ? true : false}
                    />
                    <CFormFeedback tooltip invalid>
                      Please Enter Phone Number.
                    </CFormFeedback>
                  </CCol>
                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="phoneNumber">Age Of Business</CFormLabel>
                    <CFormInput
                      type="text"
                      id="ageOfBusiness"
                      value={formValues.ageOfBusiness}
                      onChange={handleInputChange}
                      required
                      // disabled={id ? true : false}
                    />
                    <CFormFeedback tooltip invalid>
                      Please Enter Age Of Business.
                    </CFormFeedback>
                  </CCol>
                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="interestLevel">Interest Level</CFormLabel>

                    <Select
                      label="Single select"
                      options={riskLevel}
                      value={interestLevel}
                      onChange={(option) => setInterestLevel(option)}
                      styles={colourStyles}
                    />
                    <CFormFeedback tooltip invalid>
                      Please Enter Interest Level.
                    </CFormFeedback>
                  </CCol>
                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="currentProcessor">Current Processor</CFormLabel>
                    <CFormInput
                      type="text"
                      id="currentProcessor"
                      value={formValues.currentProcessor}
                      onChange={handleInputChange}
                      required
                      // disabled={id ? true : false}
                    />
                    <CFormFeedback tooltip invalid>
                      Please Enter Current Processor.
                    </CFormFeedback>
                  </CCol>
                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="timeframeToSwitch">Time Frame To Switch</CFormLabel>
                    <CFormInput
                      type="text"
                      id="timeframeToSwitch"
                      value={formValues.timeframeToSwitch}
                      onChange={handleInputChange}
                      required
                      // disabled={id ? true : false}
                    />
                    <CFormFeedback tooltip invalid>
                      Please Enter Time Frame To Switch.
                    </CFormFeedback>
                  </CCol>
                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="contactReason">Contact Reason</CFormLabel>
                    <CFormInput
                      type="text"
                      id="contactReason"
                      value={formValues.contactReason}
                      onChange={handleInputChange}
                      required
                      // disabled={id ? true : false}
                    />
                    <CFormFeedback tooltip invalid>
                      Please Enter Contact Reason.
                    </CFormFeedback>
                  </CCol>
                  {/* {id && (
                    <>
                      <CCol md={4} className="position-relative">
                        <CFormLabel htmlFor="phoneNumber">Create Date</CFormLabel>
                        <div>{moment(dataValue?.dateCreated).format('DD-MM-YYYY')}</div>
                      </CCol>

                      <CCol md={4} className="position-relative">
                        <CFormLabel htmlFor="phoneNumber">Updated Date</CFormLabel>
                        <div>{moment(dataValue?.dateUpdated).format('DD-MM-YYYY')}</div>
                      </CCol>
                      <CCol md={4} className="position-relative">
                        <CFormLabel htmlFor="phoneNumber">Discovered Date</CFormLabel>
                        <div>{moment(dataValue?.dateDiscovered).format('DD-MM-YYYY')}</div>
                      </CCol>
                    </>
                  )} */}
                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="emailAddress">Source</CFormLabel>
                    <CFormInput
                      type="text"
                      id="source"
                      value={formValues?.source}
                      onChange={handleInputChange}
                      required
                      // disabled={id ? true : false}
                    />
                    <CFormFeedback tooltip invalid>
                      Please Enter Source.
                    </CFormFeedback>
                  </CCol>
                  <CCol md={4} className="position-relative">
                    <CFormLabel htmlFor="emailAddress">Discovered Date</CFormLabel>
                    <CFormInput
                      type="date"
                      id="dateDiscovered"
                      value={formValues?.dateDiscovered}
                      onChange={handleInputChange}
                      required
                      // disabled={id ? true : false}
                    />
                    <CFormFeedback tooltip invalid>
                      Please Enter Discovered Date.
                    </CFormFeedback>
                  </CCol>

                  {id && (
                    <CCol md={4} className="position-relative">
                      <CFormLabel htmlFor="phoneNumber">Risk Level</CFormLabel>

                      <Select
                        label="Single select"
                        options={riskLevel}
                        value={selectedRisk}
                        onChange={(option) => setSelectedRisk(option)}
                        styles={colourStyles}
                      />
                    </CCol>
                  )}

                  {id && (
                    <CCol md={4} className="position-relative">
                      <CFormLabel htmlFor="phoneNumber">Assignee</CFormLabel>

                      <Select
                        label="Single select"
                        options={assignees}
                        value={selectedOption}
                        onChange={handleChange}
                        styles={colourStyles}
                      />
                    </CCol>
                  )}

                  <CCol xs={12} className="position-relative">
                    <CButton color="primary" onClick={() => navigate('/lead')}>
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
