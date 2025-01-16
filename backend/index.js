const express = require('express')
const app = express()
const morgan = require('morgan')
const date = Date('en-US')

app.use(express.json())


app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
 });
const persons = [
   { 
     "id": "1",
     "name": "Arto Hellas", 
     "number": "040-123456"
   },
   { 
     "id": "2",
     "name": "Ada Lovelace", 
     "number": "39-44-5323523"
   },
   { 
     "id": "3",
     "name": "Dan Abramov", 
     "number": "12-43-234345"
   },
   { 
     "id": "4",
     "name": "Mary Poppendieck", 
     "number": "39-23-6423122"
   }
]

//morgan generates token
morgan.token('body', (req) =>JSON.stringify(req.body))
// middleware for logging 
app.use(morgan(':method :url :status :response-time ms - :body '))


app.get('/info', (req, res) => {
   res.send(`<p>Phonebook has info for ${persons?.length} people</p><p>${date}</p>`)
})

app.get('/api/persons', (req, res) => {
   res.json(persons)
})

app.post('/api/persons', (req, res) => {
   const body = req.body
   if (!body.name || !body.number) {
      return res.status(400).json({
         error: 'name or number missing'
      })
   }

   const isExist = persons.find(person => person.name === body.name)
   if (isExist) {
      return res.status(400).json({
         error: 'name must be unique'
      })
   }

   const newPerson = {
      id: Math.floor(Math.random() * 1000).toString(),
      name: body.name,
      number: body.number,
   }

   persons.push(newPerson)
   res.json(newPerson)
})

app.get('/api/persons/:id', (req, res) => {
   const id = req.params.id
   const person = persons.find(person => person.id == id)
   if(person){
      res.json(person) 
   }else{
      res.status(404).end()
   }
   console.log(person)
   
})

app.delete('/api/persons/:id', (req, res) => {
   const id = req.params.id
   const person = persons.filter(person => person.id !== id)
   res.status(204).end()
   console.log(person)
})

const PORT = 3001
app.listen(PORT, () => {
   console.log(`Server is running at ${PORT}`)
})
