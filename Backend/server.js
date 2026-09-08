import 'dotenv/config'
import app from './src/app.js'
import { connectDatabase } from './src/config/db.js'

const port = process.env.PORT || 5000
try {
  await connectDatabase()
  app.listen(port, () => console.log(`CinePass API running on http://localhost:${port}`))
} catch (error) {
  console.error(`Unable to start server: ${error.message}`)
  process.exit(1)
}
