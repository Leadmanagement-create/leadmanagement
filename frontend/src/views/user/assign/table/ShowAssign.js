import React, { useEffect, useState } from 'react'
import {
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilDelete } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'
import services from '../../../../services'
import { toast } from 'react-toastify'
import { Tooltip } from 'react-tooltip'
// import { Loading } from '../../../../components'
import { Confirm } from '../../../../components'
import { CSpinner } from '@coreui/react'

const ShowAssign = () => {
  const [values, setValues] = useState([])
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [selectedId, setSelectedId] = useState('')
  const [modalShow, setModalShow] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    getAllUser()
  }, [])
  const getAllUser = async () => {
    try {
      setLoadingStatus(false)
      const response = await services.assigners.GET_ALL_ASSIGNERS('user')
      setValues(response?.data)
      setLoadingStatus(true)
    } catch (e) {
      console.error(e)
    }
  }
  const handleDelete = async (id) => {
    try {
      setLoadingStatus(false)
      await services.assigners.DELETE_ASSIGNERS(id)
      toast.success('Delete Successfully')
      setValues((prev) => prev.filter((item) => item?._id != id))
      setLoadingStatus(true)
    } catch (e) {
      console.error(e)
    }
  }
  const handleYes = () => {
    setModalShow(false)
    handleDelete(selectedId)
  }
  return (
    <div>
      {!loadingStatus ? (
        <CSpinner color="primary" />
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'end', margin: '10px 0px 15px 0px' }}>
            <CButton
              as="input"
              type="submit"
              color="primary"
              value="Add User"
              onClick={() => navigate('/useradd')}
            />
          </div>
          <CTable>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">First Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Last Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone Number</CTableHeaderCell>
                <CTableHeaderCell scope="col">Role</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {values &&
                values?.length > 0 &&
                values?.map((item, index) => {
                  return (
                    <>
                      <CTableRow>
                        <CTableHeaderCell scope="row">{item?.first_name}</CTableHeaderCell>
                        <CTableDataCell>{item?.last_name}</CTableDataCell>
                        <CTableDataCell>{item?.email}</CTableDataCell>
                        <CTableDataCell>{item?.phoneNumber}</CTableDataCell>
                        <CTableDataCell>{item?.role}</CTableDataCell>
                        <CTableDataCell>
                          <div style={{ display: 'flex', gap: '20px' }}>
                            <CIcon
                              icon={cilPencil}
                              size="lg"
                              onClick={() => navigate(`/useradd/${item?._id}`)}
                              style={{ cursor: 'pointer' }}
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="Edit"
                              data-tooltip-place="top"
                            />
                            <CIcon
                              icon={cilDelete}
                              size="lg"
                              onClick={() => {
                                setModalShow(true)
                                setSelectedId(item?._id)
                              }}
                              style={{ cursor: 'pointer' }}
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="Delete"
                              data-tooltip-place="top"
                            />
                          </div>
                        </CTableDataCell>
                      </CTableRow>
                    </>
                  )
                })}
            </CTableBody>
          </CTable>
          <Tooltip id="my-tooltip" />
        </div>
      )}
      <Confirm
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={'Delete User'}
        handleYes={handleYes}
      />
    </div>
  )
}

export default ShowAssign
