const express = require('express')
const bodyParser = require("body-parser")
const axios = require("axios")
const PORT = 5000
const app = express()
app.use(express.json());

app.listen(PORT, ()=>{
    console.log("Server rodando na porta:", PORT)
})"

app.get('/', async (req,res)=>{
    const params = req.query
    const rick = await getRick()
    if(params.page && params.limit){

        let page = params.page
        let limit = params.limit
        const totalResults = rick.data.results.length
        const totalPages = totalResults/limit

        const inicio = (page - 1)*limit
        const fim = limit*page

        res.send({info: {pages: totalPages, count: totalResults},
            results: rick.data.results.slice(inicio,fim)})

    }else if(params.page){
        const rickPage = await getRickWithPage(params.page)
        res.json(rickPage.data)
    }else{
        res.json(rick.data)
    }

})

const getRick = async () => {
    try {
      return await axios.get('https://rickandmortyapi.com/api/character')
    } catch (error) {
      console.error(error)
    }
  }

const getRickWithPage = async (page) => {
try {
    return await axios.get(`https://rickandmortyapi.com/api/character/?page=${page}`)
} catch (error) {
    console.error(error)
}
}
