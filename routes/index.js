const express = require('express');
const Ordem = require('../public/classes/ordem');
var router = express.Router();
const Ordens = require("../public/classes/ordem")

/* GET home page. */

//READ

router.get("/", async (req, res) => {
  await Ordens.prototype.mostrarOrdens()
  .then( (posts) => {
    res.render("index", {
      posts: posts
    }) 
  }).catch( () => {
      res.send("Not Found");
  })    
})

//CREATE

router.post("/", async(req, res) => {
  let ordem = new Ordem(
      req.body.nome,
      req.body.cpf,
      req.body.telefone,
      req.body.valor,
      req.body.local,
      req.body.data,
      req.body.descricao,
      true
  )

  await ordem.cadastrarOrdem(ordem)
  .then(() => {
      res.redirect("/")   
  }).catch( () => {
      res.send("Not Found");
  })
})

//UPDATE

router.post("/editar/:id", async(req, res) => {
  await Ordens.prototype.atualizarOrdem(req.body, req.params.id) 
  .then( () => {
      res.redirect("..")
  }).catch( () => {
      res.send("Not Found")
  })
})


router.get("/finalizar/:id", async(req, res) => {
  await Ordens.prototype.atualizarOrdem({ ativo: false }, req.params.id)
  .then( () => {
      res.redirect("..")
  }).catch( () => {
      res.send("Not Found")
  });
})

router.get("/editar/:id", async(req, res) => {
  await Ordens.prototype.mostrarOrdem(req.params.id)
  .then( (ordemedit) => {
      res.render("update", {
          id: ordemedit.id,
          nome: ordemedit.nome,
          cpf: ordemedit.cpf,
          telefone: ordemedit.telefone,
          valor: ordemedit.valor,
          local: ordemedit.local,
          data: ordemedit.data,
          descricao: ordemedit.descricao
      })
  }).catch( () => {
      res.send("Not Found")
  })
})


//DELETE - Aluno

router.get("/excluir/:id", async(req, res) => {
  await Ordens.prototype.deleteOrdem(req.params.id)
  .then( () => {
      res.redirect("/alunos/registros")
  }).catch( () => {
      res.send("Not Found")
  });
})

router.get("/logout", (req, res) => {
  res.clearCookie('connect.sid').redirect("/login");
})

module.exports = router;
