import { io } from 'socket.io-client'
import constant from './constant'

const SOCKET_URL = constant.SOCKET_URL

const socket = io(SOCKET_URL, {
  transports: ['websocket'],
})

export default socket
