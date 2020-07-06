DROP TABLE IF EXISTS TB_HEROIS;
CREATE TABLE TB_HEROIS (
    ID INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL,
    NOME TEXT NOT NULL,
    PODER TEXT NOT NULL
)

--create
INSERT INTO TB_HEROIS (NOME, PODER)
VALUES
    ('Mulher Maravilha', 'Super Força'),
    ('Ravena', 'Criar Portais'),
    ('Canario Negro', 'Poderoso Grito')

--read
SELECT * FROM TB_HEROIS;
SELECT * FROM TB_HEROIS WHERE NOME = 'Mulher Maravilha';

--update
UPDATE TB_HEROIS
SET NOME = 'Katana', PODER = 'Artes Marciais'
WHERE ID = 3;

--delete
DELETE FROM TB_HEROIS WHERE ID = 3