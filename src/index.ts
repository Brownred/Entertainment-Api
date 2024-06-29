import express, { Response, Request } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { getArticles } from './articles/articles'


const app = express()


// Top Level middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))


//  Routes
app.get('/news', async (req: Request, res: Response) => {
    res.status(200).json({data: await getArticles()})
})

// Server
app.listen(8001, () => {
    console.log('server listening on http://localhost:8001')
})  
 



