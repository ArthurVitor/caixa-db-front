<h1>Pato-Checkout 🦆</h1> 

### Descrição do Projeto

O PatoCheckout é um sistema de venda intuitivo e eficiente que visa atender às necessidades de estabelecimentos comerciais, proporcionando uma gestão simplificada de produtos e transações financeiras. Com base em requisitos funcionais e regras de negócio específicas, o PatoCheckout oferece uma variedade de funcionalidades para aprimorar a experiência do usuário no processo de vendas e controle financeiro.

### REQUISITOS FUNCIONAIS:
<ul>
   <li>RF01 - O sistema deve permitir ao usuário criar um produto (de acordo com RN01)</li>
   <li>RF02 - O sistema deve permitir ao usuário deletar um produto preexistente</li>
   <li>RF03 - O sistema deve permitir ao usuário listar todos os produtos existentes</li>
   <li>RF04 - O sistema deve permitir ao usuário editar um produto</li>
   <li>RF05 - O sistema deve permitir ao usuário abrir o caixa</li>
   <li>RF06 - O sistema deve permitir ao usuário cadastrar uma venda (de acordo com RN02)</li>
   <li>RF07 - O sistema deve permitir ao usuário fechar o caixa aberto</li>
   <li>RF08 - O sistema deve permitir ao usuário ver os caixas abertos atualmente</li>
   <li>RF09 - O sistema deve permitir ao usuário ver os caixas que já foram fechados</li>
</ul>

### REGRAS DE NEGÓCIO:
<ul>
   <li>RN01: Os produto devem conter informações como preço, código de barra, se é permitido ou não desconto.</li>
   <li>RN02: Ao cadastrar uma venda, o usuário deve informar o método de pagamento, os produtos da venda e suas respectivas quantidades e deve ser registrado o horário da venda</li>
</ul>


## Mapa de Tecnologias 📰

A Biblioteca/Framework principal utilizada será ReactJS.

| Nome | Documentação | Links dos pacotes |
| :-: | :-: | :-: |
| Typescript | https://www.typescriptlang.org/docs/ | https://www.npmjs.com/package/typescript |
| React | https://reactjs.org/docs/getting-started.html | https://www.npmjs.com/package/react |
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





