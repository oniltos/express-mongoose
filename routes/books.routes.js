import { Router } from 'express'

const booksRouter = Router()

booksRouter.get('/', (req, res) => {
    res.json({books: true})
})

export default booksRouter