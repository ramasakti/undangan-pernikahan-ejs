const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const db = require('./Config')
const response = require('./Response')

app.use(cors())
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Konfigurasi Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })

app.get('/', async (req, res) => {
    const tamu = req.query.tamu
    const comments = await db('comment').orderBy('created_at', 'desc')

    res.render('index', {
        tamu,
        comments
    })
})

app.post('/comment/store', async (req, res) => {
    try {
        const { name, commentary } = req.body

        await db('comment').insert({ name, commentary })

        return response(200, null, ``, res)
    } catch (error) {
        console.error(error)
        return response(500, null, `Internal Server Error!`, res)
    }
})

app.post('/tf', upload.single('image'), async (req, res) => {
    try {
        const { name, account_name, message, amount } = req.body
        const image = req.file.filename

        await db('gift').insert({ name, account_name, message, amount, image })

        return response(200, null, ``, res) 
    } catch (error) {
        console.error(error)
        return response(500, null, `Internal Server Error!`, res)
    }
})

app.get('/dashboard', async (req, res) => {
    const gift = await db('gift')

    res.render('dashboard', {
        gift
    })
})

app.listen(8080, async () => {
    console.log(`Auth server is running on port 4300`)
})