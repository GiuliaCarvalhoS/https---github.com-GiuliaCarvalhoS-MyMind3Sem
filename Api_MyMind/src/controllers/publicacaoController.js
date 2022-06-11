
const knex = require('../database')
const bcrypt= require('bcryptjs')

const {v4: uuidv4} = require('uuid')


module.exports ={

  async getPublicacao (req, res, next){

    const userId = req.userId

    try {

      const publicacoes = await knex("publicacao")

      return res.status(200).json(publicacoes)
      
    } catch (error) {

      next(error)
      
    }



  },

  async publicar(req, res, next){

  //const {filename} = req.file
  

  const userId = req.userId

    
    try{
      
      
    const {texto,titulo}= req.body

  

    await knex('publicacao').insert({
       id:uuidv4(),
       texto,
       titulo,
       


    })
    return res.status(201).send("Publição com sucesso")


    }
    catch(error){
        next(error)
        
    } 
  },
  async delete(request,response, next){

    try {

      const {id}= request.params
      

      const publicacoes = await  knex("publicacao") //psicologos cadastrados
      
      // const psi = psicologos.findIndex( psicologo => psicologo.nomeUsuario === nomeUsuario && psicologo.senhaUsuario === senhaUsuario)

      const user = publicacoes.find(publicacao => publicacao.id === id) //encontra o usuario especifico


    
        
      await knex("publicacao").where({id}).del()

      return response.send(`${user.titulo}, deletado com sucesso`)
        
    

      
      
    } catch (error) {
      next(error)
    }
  }


}
