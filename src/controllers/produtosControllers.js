const db = require("../models/produtosModels")
const crypto = require("crypto")

const exibirTodos = async(req,res)=>{
try {
    const produtos = await db()
res.status(200).send(produtos)
} catch (error) {
    res.status(500).send({
        message:error.message
    })
}
}

const exibirPorId = async(req,res)=>{
    const { id } = req.params
try {
    const produtos = await db()
    const produtoEncontrado = produtos.find(prod=>prod.id==id)
    if (produtoEncontrado==undefined){
        return res.status(404).send({message:"produto não encontrado"})
    }
    res.status(200).send(produtoEncontrado)
} catch (error) {
    res.status(500).send({
        message:error.message
    })
}
}

const buscarNome = async(req,res)=>{
    produtos = await db()
    const { busca } = req.params
    try {
        const resultadosBusca = []
        for (let prod of produtos){
            if(prod.produto.toLowerCase().includes(busca.toLowerCase())){
                resultadosBusca.push(prod)
            }
        }
        if (resultadosBusca[0]==undefined) return res.status(404).send({
            message: `${busca} não encontrado`
        })
        res.status(200).send(resultadosBusca)
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
    }
}

const criarNovo = async(req,res)=>{
    try {
        const produtos = await db()
        const {
            produto,tipo,preco
        }=req.body[0]
        const novoProduto = {id: crypto.randomUUID(), produto,tipo,preco}
        produtos.push(novoProduto)
        res.status(201).send(novoProduto)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

const atualizarProduto = async(req,res)=>{
    produtos = await db()
    const { id } = req.params
    const { produto, ...prodBody } = req.body[0]
    try {
        const produtoEncontrado=produtos.find(produto=>produto.id==id)
        if (produtoEncontrado==undefined) return res.status(404).send({
            message: "produto não encontrado"
        })
        const chaves = Object.keys(produtoEncontrado)
        chaves.forEach(chave=>{
        let dadoAtualizado = prodBody[chave]
        let existeDado = new Boolean(dadoAtualizado)
        if (existeDado == true) produtoEncontrado[chave] = dadoAtualizado
    })
        res.status(200).send(produtoEncontrado)
    } catch (error) {
        res.status(500).send({
            message:error.message
        })
    }
}

const atualizarProdutoPatch = async(req,res)=>{
    produtos = await db()
    const { id } = req.params
    const { produto, tipo, preco } = req.body[0]
    
    try {
    const produtoEncontrado=produtos.find(produto=>produto.id==id)
        if (produtoEncontrado==undefined) return res.status(404).send({
            message: "produto não encontrado"
        })
        if (produto) produtos.produto = produto
        if (tipo) produtos.produto = tipo
        if (preco) produtos.produto = preco
        res.status(200).send({message: "ok"})
} catch (error) {
    res.status(500).send({
        message:error.message
    })
}
}

const deletarProduto = async(req,res)=>{
const { id }=req.params
    try {
    const produtos = await db()
    const produtoIndice=produtos.findIndex(produto=>produto.id==id)
    if (produtoIndice==-1)return res.status(404).send({
        message: "produto não encontrado"
    })
    produtos.splice(produtoIndice,1)
    res.status(200).send({message: "Produto deletado"})
} catch (error) {
    res.status(500).send({
        message:error.message
    })
}
}

module.exports={
    exibirTodos,
    exibirPorId,
    buscarNome,
    criarNovo,
    atualizarProduto,
    deletarProduto,
    atualizarProdutoPatch
}