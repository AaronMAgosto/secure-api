import functions from 'firebase-functions'
import cors from 'cors'
import express from 'express'
import { login, signup } from './src/users.js'
import { validToken, isAdmin } from './src/middleware.js'

const app = express()
app.use(cors({origin: [ // this makes it so no other webiste can hit your api
  'http://localhost',
  'https://bocacode.com'
]}))


// lets set up our unprotected routes

app.post('/login' ,login)
app.post('/signup', signup)

// now we set up our protected routes
app.get('/secretinfo', validToken, (req, res) => res.send({message:"you made it"}))
app.get('/supersecretinfo', validToken, isAdmin,(req, res) => res.send({message:"you made it here too"}))

app.listen(3030, () => console.log('listening on port 3030')) // for testing

export const api = functions.https.onRequest(app) // for deploying