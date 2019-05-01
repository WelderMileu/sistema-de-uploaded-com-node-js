const express = require('express')
const multer = require('multer')
const app = express()

const storage = multer.diskStorage({
	destination:(req, file, cb) => {
		cb(null,'uploaded/')
	},

	filename:(req, file, cb) => {
		cb(null,Date.now()+'-'+file.originalname)
	}
})

const upload = multer({ storage })

app.set('view engine','ejs')
app.use(express.static('public'))

app.get('/',(req, res) => {
	res.render('home')
})

app.post('/',upload.single('img','nome,','idade'),(req, res)=>{
	console.log(req.body, req.files)
	res.send('Dados Enviados com sucesso')
})



app.listen(3000,(error)=>{
	const open = error?"Erro ao conectar ao servidor"
	:"Servidor rodando: http://localhost:3000"

	console.log(open)
})