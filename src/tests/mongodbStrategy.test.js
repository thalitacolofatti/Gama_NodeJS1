const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb/mongodb')
const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroisSchemas')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
    nome: 'Grande Barda',
    poder: 'Longevidade'
}

const MOCK_HEROI_DEFAULT = {
    nome: `Oráculo-${Date.now()}`,
    poder: 'Inteligência'
}
const MOCK_HEROI_ATUALIZAR = {
    nome: `Vixen-${Date.now()}`,
    poder: 'Talismã'
}

let MOCK_HEROI_ID = ''

let context = {}

describe('MongoDB Suite de testes', function () {
    this.beforeAll(async () => {
        const connection = MongoDb.connect()
        context = new Context(new MongoDb(connection, HeroiSchema))

        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.create(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
    })
    it('verificar conexao', async () => {
        const result = await context.isConnected()
        
        const expected = 'Conectado'
        assert.deepEqual(result, expected)
    })
    it('cadastrar', async () => {
        const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async () => {
        const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })
        const result = {
            nome, poder
        }
        assert.deepEqual(result, MOCK_HEROI_DEFAULT)
    })
    it('atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Kalista'
        })
        assert.deepEqual(result.nModified, 1)
    })
    it('remover', async () => {
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepEqual(result.n, 1)
    })
})