# Decisões Jurídicas API

Este projeto é uma API desenvolvida para gerenciar e consultar dados relacionados a decisões jurídicas. A API utiliza **Node.js**, **Express** e **Neo4j** como banco de dados para armazenar e consultar os dados.

## Tecnologias Utilizadas

- **Node.js**: Plataforma para execução de código JavaScript no servidor.
- **Express**: Framework para criação de APIs REST.
- **Neo4j**: Banco de dados orientado a grafos.
- **dotenv**: Gerenciamento de variáveis de ambiente.
- **cors**: Middleware para habilitar o compartilhamento de recursos entre diferentes origens.

### Principais Arquivos

- **`index.js`**: Arquivo principal que inicializa o servidor Express.
- **`./Models/index.js`**: Cria a conexão com o banco de dados Neo4J junto a uri de acesso ao Virtuoso.

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/decisoes-juridicas-api.git
   cd decisoes-juridicas-api
    ```
2. Instale as dependências:
   ```bash
   npm install
   ```

3. Preencha ou crie o arquvio `.env` na raiz do projeto e adicioneq suas variáveis de ambiente:

    ```env
    PORT=3000
    HOST=localhost
    DB_USER_NEO4J=neo4j
    DB_PASSWORD_NEO4J=sua-senha
    DB_USER_VIRTUOSO=dba
    DB_PASSWORD_VIRTUOSO=sua-senha
    ```

4. Inicie o servidor:
   ```bash
   npm start
   ```

### Tratamento de Erros
Os erros são tratados e retornados no formato JSON com o código de status HTTP apropriado.

## Contribuição
Contribuições são bem-vindas! Siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma branch para sua feature:
```git checkout -b minha-feature```
3. Faça o commit das suas alterações:
```git commit -m "Minha nova feature"```
4. Envie para o repositório remoto:
```git push origin minha-feature```
5. Abra um Pull Request.