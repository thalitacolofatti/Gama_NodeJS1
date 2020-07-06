//npm i mongoose

const Mongoose = require('mongoose')
Mongoose.connect('mongodb://<>:<>@192.168.99.100:27017/<>',
    { useNewUrlParser: true}, function (error) {
        if(!error) return;
        console.log('Falha na conexão!', error)
    })

const connection = Mongoose.connection

// function nomeFuncao() {

// }
// const minhaFuncao = function () {

// }
// const minhaFuncaoArrow = () => {

// }
// const minhaFuncaoArrow = (params) => console.log(params)

//erro pass option { useUnifiedTopology: true } to the MongoClient constructor

connection.once('open', () => console.log('database rodando!!'))
// setTimeout(() => {
//     const state = connection.readyState
//     console.log('state', state)

// }, 1000)


/*
0 - disconectado
1 - Conectado
2 - conectando
3 - disconectando
*/

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    }, 
    poder: {
        type: String,
        required: true
    }, 
    insersertedAt: {
        type: Date,
        default: new Date()
    }
})
const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Oráculo', 
        poder: 'Inteligência'
    })
    console.log('result cadastrar', resultCadastrar)

    const listItens = await model.find()
    console.log('items', listItens)
}
main()