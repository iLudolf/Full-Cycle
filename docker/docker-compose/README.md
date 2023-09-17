# README do Projeto

Este repositório contém uma configuração do Docker Compose e uma aplicação Node.js que se comunicam com um banco de dados MySQL. O objetivo deste projeto é demonstrar como usar o Docker Compose para orquestrar contêineres de aplicação e banco de dados, bem como interagir com o banco de dados usando uma aplicação Node.js.

## Configuração do Docker Compose

O arquivo `docker-compose.yml` define a infraestrutura do projeto usando Docker Compose. Aqui está uma visão geral dos serviços definidos:

### Serviço "app"

- O serviço "app" é construído a partir do diretório atual (onde o arquivo `Dockerfile` está localizado).
- O nome do contêiner é definido como "app".
- Este serviço depende dos serviços "db" e "web".
- É reiniciado automaticamente em caso de falha.
- Está conectado à rede "full-cycle".

### Serviço "db"

- Este serviço utiliza a imagem oficial do MySQL.
- O nome do contêiner é definido como "mysql".
- É reiniciado automaticamente em caso de falha.
- O serviço expõe a porta 3306 do contêiner para a porta 3306 do host.
- Define variáveis de ambiente para configurar a senha do root do MySQL e o nome do banco de dados.
- Mapeia um volume para inicializar o banco de dados com um arquivo SQL localizado em `./sql/init.sql`.
- Também está conectado à rede "full-cycle".

### Serviço "web"

- O serviço "web" é construído a partir do diretório `./nginx`.
- O nome do contêiner é definido como "nginx".
- É reiniciado automaticamente em caso de falha.
- Mapeia a porta 80 do contêiner para a porta 80 do host.
- Também está conectado à rede "full-cycle".

### Rede "full-cycle"

- Define uma rede personalizada chamada "full-cycle" com o driver de bridge. Isso permite que os contêineres "app", "db" e "web" se comuniquem entre si usando esse nome de serviço como host.

## Aplicação Node.js (app)

A aplicação Node.js é uma simples API que se conecta ao banco de dados MySQL e fornece dois endpoints:

1. `GET /`: Retorna uma mensagem "Full Cycle Rocks!".
2. `GET /peoples`: Retorna todos os registros da tabela "people" no banco de dados MySQL.

A aplicação utiliza a biblioteca Express para criar o servidor web e a biblioteca mysql2 para se conectar ao banco de dados MySQL. A conexão com o banco de dados é configurada para usar o nome do serviço "mysql" como host, conforme definido no arquivo `docker-compose.yml`.

## Executando o Projeto

Para executar este projeto, siga estas etapas:

1. Certifique-se de ter o Docker e o Docker Compose instalados em sua máquina.

2. Clone este repositório em sua máquina.

3. Navegue até o diretório raiz do projeto no terminal.

4. Execute o seguinte comando para iniciar os contêineres:

   ```bash
   docker-compose up -d
   ```

   Isso iniciará os serviços definidos no arquivo `docker-compose.yml` em segundo plano.

5. Aguarde até que os contêineres estejam prontos e em execução.

6. Acesse a aplicação em seu navegador ou usando ferramentas como curl ou Postman.

   - A mensagem "Full Cycle Rocks!" pode ser acessada em: `http://localhost:80`
   - Os dados da tabela "people" podem ser acessados em: `http://localhost:3000/peoples`

7. Quando terminar, você pode parar e remover os contêineres executando:

   ```bash
   docker-compose down
   ```

Isso encerrará os contêineres e removerá os recursos do Docker relacionados a este projeto.

## Observações

- Certifique-se de que as dependências do Node.js estão instaladas localmente para executar a aplicação.

- Os detalhes de conexão com o banco de dados, como senha e nome do banco de dados, estão definidos no arquivo `docker-compose.yml` e na aplicação Node.js.

- Certifique-se de que o arquivo SQL de inicialização (`init.sql`) esteja localizado no diretório `./sql/` e contenha as instruções SQL desejadas para a inicialização do banco de dados.

Este projeto é um exemplo simples de como usar o Docker Compose para criar uma infraestrutura de contêineres que inclui uma aplicação Node.js e um banco de dados MySQL. Você pode personalizá-lo de acordo com suas necessidades e usá-lo como ponto de partida para projetos mais complexos.