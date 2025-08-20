import express from 'express'
import categoriasRoutes from './routes/CategoriaRoutes.js'
import marcasRoutes from './routes/MarcaRoutes.js'
import productosRoutes from './routes/ProductoRoutes.js'
const app = express()

app.use(express.json())

app.use('/categorias', categoriasRoutes)
app.use('/marcas', marcasRoutes)
app.use('/productos', productosRoutes)


export default app