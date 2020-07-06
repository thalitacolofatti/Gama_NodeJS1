//npm i @hapi/hapi 
//npm i @hapi/vision @hapi/inert hapi-swagger
const { config } = require('dotenv')
const { join } = require('path')
const { ok } = require('assert')

const env = process.env.NODE_ENV || "dev"
ok(env == "prod" || env == "dev", "a env é inválida, ou dev ou prod")

const configPath = join('./config', `.env.${env}`)
config({
    path: configPath
})
const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchemas')
const HeroesRoute = require('./routes/heroesRoutes')
const AuthRoute = require('./routes/authRoutes')

const Postgres = require('./db/strategies/postgres/postgres')
const UsuarioSchema = require('./db/strategies/postgres/schemas/usuarioSchema')

const HapiSwagger = require('hapi-swagger')
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert')
const HapiJwt = require('hapi-auth-jwt2')
const UtilRoutes = require('./routes/utilRoutes')
const JWT_SECRET = process.env.JWT_KEY

const app = new Hapi.Server({
    port: process.env.PORT
})

function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    const connection = MongoDb.connect()
    const context = new Context(new MongoDb(connection, HeroiSchema))

    const connectionPostgres = await Postgres.connect()
    const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
    const contextPostgres = new Context(new Postgres(connectionPostgres, model))

    const swaggerOptions = {
        info: {
            title: 'API Herois - #CursoNodeBR',
            version:'v1.0'
        }
        //lang: 'pt'
    }
    await app.register([
        HapiJwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ])
    app.auth.strategy('jwt', 'jwt', {
        key: JWT_SECRET,
        // options: {
        //     expiresIn:20
        // },
        validate: async (dado, request) => {
            const [result] = await contextPostgres.read({
                username: dado.username.toLowerCase()
            })
            if (!result){
                return {
                    isValid: false
                }
            }
            //verifica no banco se usuario continua ativo
            //verifica no banco se usuario continua pagando

            return {
                isValid : true // caso nao valido false
            }
        }
    })
    app.auth.default('jwt')
    app.route([
        ...mapRoutes(new HeroesRoute(context), HeroesRoute.methods()),
        ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods()),
        ...mapRoutes(new UtilRoutes(), UtilRoutes.methods())
    ]
        
    )
    await app.start()
    console.log('Servidor rodando na porta', app.info.port)

    return app
}
module.exports = main()