//npm test
//npm run test:watch

const assert = require('assert')
const Postgres = require('./../db/strategies/postgres/postgres')
const HeroiSchema = require('./../db/strategies/postgres/schemas/heroiSchema')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mera', 
    poder: 'Controle das águas'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: 'Zatana', 
    poder: 'Mágica'
}

describe('Postgres Strategy', function () {
    this.timeout(Infinity)
    this.beforeAll(async function () {
        const connection = await Postgres.connect()
        const model = await Postgres.defineModel(connection, HeroiSchema)
        context = new Context(new Postgres(connection, model))
        await context.delete()
        await context.create(MOCK_HEROI_ATUALIZAR)
    })
    it('PostgresSQL Connection', async function() {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('cadastrar', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id 
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async function () {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete result.id
        //primeira posicao 
        //const [pos1, pos2] = ['1','2'] 

        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async function () {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome})
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR, 
            nome: 'Oráculo'
        }
        const [result] = await context.update(itemAtualizar.id, novoItem)
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id})
        assert.deepEqual(result, 1)
        assert.deepEqual(itemAtualizado.nome, novoItem.nome)
        // no JS há o rest/spread para megear ou separar objetos
        // { nome: x, poder: y}
        // { novo: bla}
        // == { nome: X, poder: y, novo: bla}
    })
    it('remover por id', async function () {
        const [item] = await context.read({})
        const result = await context.delete(item.id)
        assert.deepEqual(result, 1)
    })
})