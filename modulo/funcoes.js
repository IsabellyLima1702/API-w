const Module = require('module')
var whatsapp = require('./contatos')

const getDadosPessoais = function(configuracao){

    let sistema = {}
    let status = false
    let persona = Number(configuracao)
    whatsapp.contatos.whatsUsers.forEach(function(item){
        if(Number(item.number)== persona){
            sistema.id = item.id
            sistema.conta = item.account
            sistema.desde = item['created-since']
        }
        return status
    })
    return sistema
}

const getDadosProfile = function(configuracao){

    let sistema = {}
    let status = false
    let profile = Number(configuracao)
    whatsapp.contatos.whatsUsers.forEach(function(item){
        if(Number(item.number)== profile){
            sistema.nickname = item.nickname
            sistema.foto = item['profile-image']
            sistema.fundo = item.background
        }
        return status
    })
    return sistema
}


const getDadosContato = function(configuracao){

    let sistema = {}
    let status = false
    let desafio = String(configuracao).toUpperCase()
    whatsapp.contatos.whatsUsers.forEach(function(item){
        if(String(item.account).toUpperCase()== desafio){
            sistema.usuario = item.account

            item.contacts.forEach(function(itemContato){
                
                sistema.nome = itemContato.name
                sistema.imagem = itemContato.image
                sistema.descricao = itemContato.description

            })
            
        }
        return status
    })
    return sistema
}

const getConversas = function(configuracao){
    let desafio = []
    let status = false
    let sistema = String(configuracao).toUpperCase()
    whatsapp.contatos.whatsUsers.forEach(function(item){
        if(String(item.account).toUpperCase()== sistema){
            desafio.usuario = item.account
        
            item.contacts.forEach(function(itemContato){
               desafio.push(itemContato.name)
               desafio.push(itemContato.messages)
            })

        }
        return status
    })
    return desafio
}

const getFiltroConversas = function(configuracao, filtro2){

   let sistema = []
   let desafio = String(configuracao).toUpperCase()
   let filtrando = String(filtro2).toUpperCase()
   let status = false

    whatsapp.contatos.whatsUsers.forEach(function(item){

       if(Number(item.number)== desafio){
            item.contacts.forEach(function(itemContato){
                if(String(itemContato.name).toUpperCase() == filtrando){
                    sistema.push(itemContato.messages)

                    sistema.usuario = item.account
                    sistema.conversa_com = itemContato.name
                }
            })

        }
        return status
    })

    return sistema
}

const getfiltroPesquisa = function(filtro1, filtro2, filtro3){
    let contato = whatsapp
    let persona = Number(filtro1)
    let telefone = String(filtro2).toUpperCase()
    let chave = String(filtro3).toUpperCase()
    let itemA
    let itemC
    let desafio = []
    let status = false

    contato.contatos.whatsUsers.forEach(function(itemB){
        contato = itemB.contacts
        if(Number(itemB.number) == persona){
            itemB.contacts.forEach(function(item){
                itemA = item.name
                if(String(itemA).toUpperCase() == telefone){
                    item.messages.forEach(function(dados){
                        itemC = dados.content
                        if(String(itemC).toUpperCase().includes(chave)){
                            status = true
                            let resultado = {}
                            resultado.usuario = itemB.account
                            resultado.contato = item.name
                            resultado.conversa = itemC
                           
                            desafio.push(resultado)
                        }
                    })
                }
            })
        }
    })

    if(status = true){
        return desafio
    }else{
        return status
    }
}

//console.log(getfiltroPesquisa('11987876567', 'Mark Johnson', 'yes'))
//console.log (getFiltroConversas('11966578996', 'José Maria da Silva'))
//console.log(getConversas('Ricardo da Silva'))
//console.log(getDadosContato('Jonathan Xavier'))
//console.log(getDadosProfile('11987876567'))
//console.log(getDadosPessoais('11987876567'))

module.exports = {
    getDadosPessoais,
    getDadosProfile,
    getDadosContato,
    getConversas,
    getFiltroConversas,
    getfiltroPesquisa
}

