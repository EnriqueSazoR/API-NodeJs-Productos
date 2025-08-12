import express from 'express'
import categoriasRouts from './routes/CategoriaRoutes.js'
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/categorias', categoriasRouts)
app.listen(port, () => console.log(`Servidor ejecutandose en http://localhost:${port}`))


