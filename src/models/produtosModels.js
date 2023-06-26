const db = () =>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            return resolve(require("../data/produtos.json"))
        }, 1500);
    })
}

module.exports = db