/*******************************************************************************************
 * Objetivo: Criar uma API para o whatsapp para fornecer dados a equipe do Front-End.
 * Data: 28/01/2025
 * Autor: Isabelly Lima
 * Versão: 1.0
 ******************************************************************************************/

const express    = require('express')
const cors       = require('cors')
const bodyParser = require('body-parser')
const {request}  = require('http')

const app = express()

app.use((request, response, next) =>{

    response.header('Acess-Control-Allow-Origin', '*')

    response.header('Acess-Control-Allow-Methods', 'GET')

    app.use(cors())

    next()
})

const getDadosPessoais = require ('./modulo/funcoes.js')
app.get('/v1/contatos/dados-pessoais/:number', cors(), async function(request, response){

    let dados = request.query.number

    let user = getDadosPessoais.getDadosPessoais(dados)

    if(user){
        response.status(200)
        response.json(user)
    }else{
        response.status(404)
        response.json({'status': '404', 'message': 'Não foi possível encontrar um dado'})
    }

})

const getDadosProfile = require ('./modulo/funcoes.js')
app.get('/v1/contatos/dados-profile/:number', cors(), async function(request, response){

    let dados = request.params.number

    let profile = getDadosProfile.getDadosProfile(dados)

    if(profile){
        response.status(200)
        response.json(profile)
    }else{
        response.status(404)
        response.json({'status': '404', 'message': 'Não foi possível encontrar um dado'})
    }

})

const getDadosContato = require ('./modulo/funcoes.js')
app.get('/v1/contatos/dados-contato/:account', cors(), async function(request, response){

    let dados = request.query.account

    let contato = getDadosContato.getDadosContato(dados)

    if(contato){
        response.status(200)
        response.json(contato)
    }else{
        response.status(404)
        response.json({'status': '404', 'message': 'Não foi possível encontrar um dado'})
    }

})

const getConversas = require ('./modulo/funcoes.js')
app.get('/v1/contatos/dados-profile/:account', cors(), async function(request, response){

    let dados = request.params.account

    let conversas = getConversas.getConversas(dados)

    if(conversas){
        response.status(200)
        response.json(conversas)
    }else{
        response.status(404)
        response.json({'status': '404', 'message': 'Não foi possível encontrar um dado'})
    }

})

const getFiltroConversas = require ('./modulo/funcoes.js')
app.get('/v1/contatos/dados-contato/filtro1', cors(), async function(request, response){

    let dados = request.query.number

    let user = request.query.name

    let filtro1 = getFiltroConversas.getFiltroConversas(dados, user)

    if(filtro1){
        response.status(200)
        response.json(filtro1)
    }else{
        response.status(404)
        response.json({'status': '404', 'message': 'Não foi possível encontrar um dado'})
    }

})

const getfiltroPesquisa = require ('./modulo/funcoes.js')
app.get('/v1/contatos/dados-profile/filtro2', cors(), async function(request, response){

    let numero = request.params.number

    let nome = request.params.name

    let mensagem = request.params.message

    let conversas = getfiltroPesquisa.getfiltroPesquisa(numero, nome, mensagem)

    if(conversas){
        response.status(200)
        response.json(conversas)
    }else{
        response.status(404)
        response.json({'status': '404', 'message': 'Não foi possível encontrar um dado'})
    }

})

app.listen('8080', function(){
    console.log('API funcionando e aguardando requisições...')

})
