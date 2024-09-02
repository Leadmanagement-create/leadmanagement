import React, { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import services from '../../../services'
import { toast } from 'react-toastify'
import socket from '../../../socket'
import { AgGridReact } from 'ag-grid-react' // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css' // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'
import CIcon from '@coreui/icons-react'
import { useSelector } from 'react-redux'
import { useColorModes } from '@coreui/react'
import { Tooltip } from 'react-tooltip'
// import { Loading } from '../../../components'
import { Confirm } from '../../../components'
import { cilPencil, cilDelete } from '@coreui/icons'
import { CSpinner } from '@coreui/react'

import moment from 'moment'
const ShowAssign = () => {
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const [values, setValues] = useState([])
  const [loadingStatus, setLoadingStatus] = useState(true)
  const [selectedId, setSelectedId] = useState('')
  const [modalShow, setModalShow] = useState(false)

  const [columnDefs] = useState([
    {
      field: 'action',
      headerName: 'Action',
       width: 120,
      cellRenderer: (params) => {
        return (
          <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
            <CIcon
              icon={cilPencil}
              size="lg"
              onClick={() => {
                navigate(`/leadadd/${params?.data?._id}`)
              }}
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
                setSelectedId(params?.data?._id)
              }}
              style={{ cursor: 'pointer' }}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Delete"
              data-tooltip-place="top"
            />
          </div>
        )
      },
    },
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 180  },
    { field: 'emailAddress', headerName: 'Email', width: 180  },
    { field: 'source', headerName: 'Source', width: 180  },
    { field: 'riskLevel', headerName: 'Risk Level', width: 120  },
    { field: 'businessType', headerName: 'Business Type', width: 180 },
    { field: 'ageOfBusiness', headerName: 'Age Of Business', width: 180 },
    { field: 'interestLevel', headerName: 'Interest Level', width: 120 },
    { field: 'currentProcessor', headerName: 'Current Processor', width: 180 },
    { field: 'timeframeToSwitch', headerName: 'Time Frame To Switch', width: 180 },
    { field: 'contactReason', headerName: 'Contact Reason', width: 180 },

    {
      field: 'dateDiscovered',
      headerName: 'Discovered',
       width: 180,
       cellRenderer: (params) => {
        return <span>{moment(params?.data?.dateDiscovered).format('DD-MMM-YYYY')}</span>
      },
    },
    {
      field: 'dateCreated',
      headerName: 'Created',
       width: 200,
      cellRenderer: (params) => {
        return <span>{params?.data?.dateCreated}</span>
      },
    },


  ])

  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    }
  }, [])

  const navigate = useNavigate()
  useEffect(() => {
    getAllLeads()
  }, [])
  const getAllLeads = async () => {
    try {
      // setLoadingStatus(false)
      const response = await services.lead.GET_ALL_LEAD(1, 100000)
      setValues(response?.data)
      // setLoadingStatus(true)
    } catch (e) {
      console.error(e)
    }
  }
  const handleDelete = async (id) => {
    try {
      setLoadingStatus(false)
      await services.lead.DELETE_LEAD(id)
      setValues((prev) => prev.filter((item) => item?._id != id))
      setLoadingStatus(true)
      toast.success('Delete Successfully')
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    socket.on('leadCreated', (message) => {
      getAllLeads()
    })
    return () => {
      socket.off('leadCreated')
    }
  }, [])
  const storedTheme = useSelector((state) => state.theme)
  const handleYes = () => {
    setModalShow(false)
    handleDelete(selectedId)
  }
  return (
    <div>
      {!loadingStatus ? (
        <CSpinner color="primary" />
      ) : (
        <div
          className={`ag-theme-quartz${storedTheme == 'dark' ? '-dark' : ''}`}
          style={{ height: 620 , width:"1300px"}}
        >
          <AgGridReact
            rowData={values}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            suppressRowClickSelection={true}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 25, 50]}
          />
        </div>
      )}

      <Tooltip id="my-tooltip" />
      <Confirm
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={'Delete Lead'}
        handleYes={handleYes}
      />
    </div>
  )
}

export default ShowAssign
