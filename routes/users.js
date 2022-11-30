const express = require('express');
const router = express.Router();
const Usuario = require("../public/classes/users")
const bcrypt = require("bcryptjs");

/* GET users listing. */
router.get("/", async(req, res) => {
  await Usuario.prototype.mostrarUsuarios()
  .then( (posts) => {
      res.render("users", {
          posts: posts
      })
  }).catch( () => {
      res.send("Not Found");
  }) 
})

router.get("/permissao/:id", async(req, res) => {
  const user = await Usuario.prototype.mostrarUsuario(req.params.id);
  const admin = user.admin;

  await Usuario.prototype.atualizarUsuario({ admin: !admin }, req.params.id)
  .then( () => {
      res.redirect("..")
  }).catch( () => {
      res.send("Not Found")
  });
})

router.post("/", async(req,res) => {
  bcrypt.hash(req.body.senha, 10, async function(err, hashedPassword) {
    let user = {
      login: req.body.login,
      senha: hashedPassword,
      salt: 10,
      admin: true,
      ativo: true
    }

    if(req.body.confirm == req.body.senha) {
      await Usuario.prototype.cadastrarUsuario(user)
      .then( () => {
          res.redirect("/users")
      }).catch( () => {
          res.send("Not Found")
      })
    }
  });
})

router.get("/finalizar/:id", async(req, res) => {
  await Usuario.prototype.atualizarUsuario({ ativo: false }, req.params.id)
  .then( () => {
      res.redirect("..")
  }).catch( () => {
      res.send("Not Found")
  });
})


module.exports = router;
