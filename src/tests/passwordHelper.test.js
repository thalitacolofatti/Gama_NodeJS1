const assert = require('assert')
const PasswordHelper = require('./../helpers/passwordHelpers')

const SENHA = 'Banana@6545645'
const HASH = '$2b$04$5weOsI3P.KnrraIK01V/.eCLwg4Ggo8H427KnCzjgWD/1Sl2TeMcy'

describe('UserHelper test suite', function () {
    it('deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)
        assert.ok(result.length > 10)
    })
    it('deve comparar uma senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        assert.ok(result)
    })

})