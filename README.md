<h1>DBInclui 💭 </h1> 

<h2>Descrição do Projeto </h2>

Web app que dissemina a cultura de inclusão dentro da DBServer, com foco na cultura surda. É destinado para todas as pessoas que desejam aprender LIBRAS e enteder um pouco mais sobre inclusão de PCD's na sociedade. O web app aproveita o guia de acessibilidade e a apostila de Libras como fonte de informação de inclusão, assim como utiliza a API VLibras para as funcionalidades específicas.

## Mapa de Tecnologias 📰

A Biblioteca/Framework principal utilizada será ReactJS.

| Nome | Documentação | Links dos pacotes |
| :-: | :-: | :-: |
| Typescript | https://www.typescriptlang.org/docs/ | https://www.npmjs.com/package/typescript |
| React | https://reactjs.org/docs/getting-started.html | https://www.npmjs.com/package/react |
| Jest | https://jestjs.io/docs/getting-started | https://www.npmjs.com/package/jest |
| Eslint | https://eslint.org/docs/latest/user-guide/getting-started | https://www.npmjs.com/package/eslint |

## Mapa de Tecnologias - Figma 📰

###  Link para o Figma do projeto: https://www.figma.com/file/l8Tjkio2SS02QEPhbd7w1D/Untitled?type=design&node-id=0-1&mode=design&t=36kma9aJNKORgI78-0

## Executando o Projeto 💻

### Instalando os módulos


$ npm install


### Iniciando o Frontend 


$ npm start


## Fluxo de versionamento 🖥

### Clone a branch "master" do repositório


$ git clone https://github.com/ArthurVitor/caixa-db-back.git

### Acesse a branch remota "master" e instale o node_modules.


$ git checkout master
$ npm install

### Crie a branch para desenvolvimento baseada no nome da Task

| Branch | Funcionalidade | 
| :-: | :-: |
| Feature | Branch para desenvolvimento de uma funcionalidade específica. Devem ter o nome iniciado por feature, por exemplo: "feature/reestruturacao-pastas". São criadas sempre a partir da branch "master".|
| Release | Serve como ponte para fazer o merge da dev para a master. Caso haja alguma alteração, também deve ser sincronizada com a Branch "dev".|
| Bugfix | Criada a partir da branch "dev" para realizar correções de erros encontrados no sistema em desenvolvimento. Quando concluída, ela é excluída após realizar o merge com a branch "dev".|
| Hotfix | Criada a partir da master para realizar correções encontradas no sistema em produção. Quando concluída, ela é excluída após realizar o merge com a branch "dev" e "master". |





