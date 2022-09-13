import express, { response } from 'express'

const app = express()

// localhost:3333/ads

app.get('/ads', (request, response) => {
    return response.json([
        { id:1, name: 'Ad1'},
        { id:2, name: 'Ad2'},
        { id:3, name: 'Ad3'},
        { id:4, name: 'Ad4'},
        { id:5, name: 'Ad5'},
    ])
})

app.listen(3333)