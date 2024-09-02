import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import bodyParser from 'body-parser'
import routes from './routes/index.js'
import cors from 'cors'
import db from './config/db.js'
import { Server } from 'socket.io';
import handleEmailScheduler from './utils/emailScheduler.js'
const app = express()
dotenv.config()
app.use(bodyParser.json({ limit: '100mb', type: 'application/json' }))

app.use(
  bodyParser.urlencoded({
    limit: '100mb',
    extended: true,
  }),
)
const server = http.createServer(app)
const io = new Server(server);

const crossOption = {
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTION'],
  credentials: true,
}
app.use(cors(crossOption))
let port = process.env.PORT || 5000
port = parseInt(port)

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


//routes
app.use(routes)
db.then(() => {
  server.listen(port, () => {
    handleEmailScheduler();
    console.log(`Server is running on port ${port}`)
  })
}).catch((err) => {
  console.error('Failed to start server due to database connection error:', err)
})
export { io };