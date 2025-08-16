import express from 'express'
import categoriasRoutes from './routes/CategoriaRoutes.js'
import marcasRoutes from './routes/MarcaRoutes.js'
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use('/categorias', categoriasRoutes)
app.use('/marcas', marcasRoutes)
app.listen(port, () => console.log(`Servidor ejecutandose en http://localhost:${port}`))


