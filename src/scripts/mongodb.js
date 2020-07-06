

//databases
show dbs

//muda contexto para uma database
use herois

//mostra tables
show collections

db.herois.insert({
    nome : 'Hunter',
    poder: 'Agilidade',
    dataNascimento: '1998-01-01'
})

db.herois.find()
//formatado
db.herois.find().pretty()

for(let i = 0; i <= 50000; i ++ ) {
    db.herois.insert({
        nome : 'Clone-${i}',
        poder: 'Agilidade',
        dataNascimento: '1998-01-01'
    })
}

db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({ nome: -1})
db.herois.find({}, { poder: 1, _id: 0})

//create
db.herois.insert({
    nome : 'Clone-${i}',
    poder: 'Agilidade',
    dataNascimento: '1998-01-01'
})

//read
db.herois.find()

//update
//atualiza mas apaga os demais dados
db.herois.update({ _id: ObjectId("5ee5a1c83cd3d99169b3cedc") },
                {nome: 'Mulher-gato'})

//atualiza apenas o item se errar a grafia no item, ele cria novo item
db.herois.update({ _id: ObjectId("5ee5a1c83cd3d99169b3cedc") },
                { $set: { nome: 'Harlequina'} })

//atualiza o primeiro item que tiver 
db.herois.update({ poder: 'Agilidade'}, 
                { $set: { poder: 'super força'} })

//delete
db.herois.remove({})
