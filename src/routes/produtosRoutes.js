const express = require("express")
const rotas = express.Router()
const produtoController = require("../controllers/produtosControllers")

rotas.get("/lista", produtoController.exibirTodos)
rotas.get("/id/:id", produtoController.exibirPorId)
rotas.get("/busca/:busca", produtoController.buscarNome)

rotas.post("/criar", produtoController.criarNovo)
rotas.put("/atualizar/:id", produtoController.atualizarProduto)
rotas.patch("/patch/:id", produtoController.atualizarProdutoPatch)
rotas.delete("/delete/:id", produtoController.deletarProduto)

module.exports=rotas