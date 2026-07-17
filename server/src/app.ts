import express from 'express'
import cors from 'cors'
import { env } from './config/env'
import { errorHandler } from './middleware/errorHandler'
import routes from './routes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', routes)

app.use(errorHandler)

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`)
})

export default app
