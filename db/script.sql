CREATE DATABASE aulaback2;

\c aulaback2;

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- insert do usuario
INSERT INTO  usuarios (id, nome, email) VALUES (1, 'Ana', 'alsouzmartins@gmail');