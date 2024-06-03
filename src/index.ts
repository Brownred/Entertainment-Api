import express, { Response, Request } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { articles } from './articles/articles'


const app = express()


// Top Level middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.get('/api', (req, res) => { 
    console.log('Hey there! Testig things out here.')
    res.json({message: 'hello'})
})

app.get('/news', (req: Request, res: Response) => {
    res.json(articles)
})

// Server
app.listen(8001, () => {
    console.log('server listening on http://localhost:8001')
})  




