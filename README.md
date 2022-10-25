<hr>
<hr>

<div align="center">
<hr>
<h1><i>:articulated_lorry: :package: :orange: :apple: :pineapple: :strawberry: :grapes: :cherries: :pear: :peach: :mango:<br><br>
 Planty Of Food RESTful API :computer: <img src="https://i.ibb.co/k3ScNKb/database-solid-svg-1.png" alt="database-solid-svg-1"><br><br>
 :corn: :potato: :eggplant: :carrot: :onion: :cucumber: :broccoli: :avocado: :hot_pepper: :garlic: :leafy_green:</i></h1>
 <hr>
</div>

### Questo é un progetto per la conclusione della **Super Guida Node.js** di **Start2Impact**, categoria Food.

<br>

<hr>
<hr>

<p align="center">
<img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/Icarus1989/Planty-of-Food-RESTful-API-Start2Impact-Node.js-Project?style=flat-square">
<img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/Icarus1989/Planty-of-Food-RESTful-API-Start2Impact-Node.js-Project">
<img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/Icarus1989/Planty-of-Food-RESTful-API-Start2Impact-Node.js-Project">
<img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Icarus1989/Planty-of-Food-RESTful-API-Start2Impact-Node.js-Project">
<img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Icarus1989/Planty-of-Food-RESTful-API-Start2Impact-Node.js-Project">
<img alt="Min Coverage nycrc Config" src="https://img.shields.io/nycrc/Icarus1989/Planty-of-Food-RESTful-API-Start2Impact-Node.js-Project?config=.nycrc&preferredThreshold=lines&style=flat-square">
<img alt="Coverage" src="https://img.shields.io/badge/code%20coverage-98%25-brightgreen">
</p>

<hr>
<hr>

<div id="begin"></div>

<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#description">Description</a>
          <ul>
          <li><a href="#intro">Intro</a></li>
          <li><a href="#rest architecture">REST Architecture</a></li>
          <li><a href="#naming">Naming</a></li>
          <li><a href="#metodi">Methods</a></li>
          <li><a href="#status code">Status Code</a></li>
          <li><a href="#database">Database</a>
            <ul>
              <li><a href="users">Users</li>
              <li><a href="products-storage">Products-storage</a></li>
              <li><a href="orders-archieve">Orders-archieve</a></li>
            </ul>
          </li>
          <li><a href="#testing">Testing</a></li>
          <li><a href="#nosqlinjections">NoSQL Injections</a></li>
          </ul>
        </li>
        <li><a href="steps">Steps</a></li>
      </ul>
    </li>
    <li><a href="#resources">Resources</a>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#demo">Demo</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contacts">Contacts</a></li>
  </ol>
</details>

<hr>
<hr>

## About The Project

### Built With

- [Node.js](https://nodejs.dev/)
- [Express.js](https://expressjs.com)
- [MongoDB Atlas](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Joi](https://joi.dev/)
- [Celebrate](https://www.npmjs.com/package/celebrate)
- [body-parser](https://www.npmjs.com/package/body-parser)

<hr>

### Testing

- [Sinon.js](https://sinonjs.org/)
- [Sinon-Express-Mock]()
- [mocha](https://mochajs.org/)
- [nycrc/instanbul](https://www.npmjs.com/package/nyc)

<br>
<br>

<p><a href="#begin">&#9650; Back to summary</a></p>

<hr>
<hr>

## Description

### Intro

Questo progetto mira ad ottenere delle API funzionanti per connettere un ecommerce con dei gruppi d'acquisto per conto di Planty Of Food, azienda che opera nel settore del cibo plant based.

Ho voluto ampliare la consegna data per il progetto arricchendo le varie risorse con ulteriori campi e funzionalità, come per esempio l'inserimento del prezzo di un prodotto e il calcolo del totale di un ordine, cercando comunque di restare pertinente al contesto fornito con (aggiunte/funzionalità/features) utili ad un eventuale uso in un'applicazione reale.

<hr>

### Architettura REST

Basandomi su quanto appreso nelle varie guide, ho cercato di creare queste API seguendo il più possibile le linee guida RESTful:
• un'architettura stateless
• una divisione netta tra client e server - la composizione finale degli ordini, con il calcolo degli importi per ogni singolo utente e il totale, il salvataggio di tale order viene eseguita interamente dal server, come anche ogni controllo di esistenza delle risorse
• un sistema diviso con una logica a layers - separando database e server, diviso a sua volta tra models, controllers, routes, classes
• un'interfaccia di comunicazione (Uniform Interface) omogenea e che permette la sua modifica a blocchi separatamente, non richiedendo però modifiche dal client, che si baserà sempre sulle stesse URI per accedere alle API
• le risorse sono autodescrittive - così come per il codice, i nomi di tutte le risorse sono stati creati per essere il più possibile human-readable
• ...

<hr>

### Naming

Ho prestato particolare attenzione al naming delle resources, ragionado su quali potevano essere i più corretti applicati al contesto di Planty of Food. Da questo per esempio i tre gruppi principali: Users, Products-Storage e Orders-Archieve.

<hr>

### Metodi

Per tutti i gruppi di risorse presenti, users, products e orders, ho creato dei metodi uniformi per la gestione dei dati:

- GET - diviso tra GET e GET/:id per ottenere l'intero insieme di risorse o una solamente basandosi sulla ricerca di un id.
- POST - per la creazione di nuove risorse
- PUT - per la modifica di risorse esistenti
- DELETE - per la cancellazione di risorse esistenti.

<hr>

### Status Code

I vari status code di risposta delle varie API sono basati sulla lista fornita di status codes, ed inseriti ponendo particolare attenzione al fatto che la risposta arrivi o no e che sia positiva o negativa.

<hr>

### Database

Come Database ho scelto di utilizzare MongoDB tramite il servizio Atlas.
All'interno del Database PlantyOfFood vi sono le tre collezioni necessarie per la gestione delle risorse: Users, Products-Storage e Orders-Archieve.

#### Users

Le risorse Users sono composte da:

• firstname - nome
• lastname - cognome
• username - sul quale si basa la ricerca tramite GET/:username
• address - indirizzo email
• orders - array di objects composti da id dell'ordine e url dello stesso
• date - data di registrazione ( semplice creazione in questo progetto )

:heavy_plus_sign: rispetto alla consegna data alle risorse users sono stati aggiunti i campi date, username e orders. Quest'ultimo in particolare verrà aggiornato all'inserimento o alla cancellazione di un ordine.

#### Products-storage

Le risorse Products sono composte da:

• name - nome del prodotto
• quantity - kilogrammi di un determinato prodotto in magazzino
• origin - origine di un prodotto
• price - prezzo al kilogrammo di un determinato prodotto

:heavy_plus_sign: rispetto alla consegna data alle risorse products sono stati aggiunti i campi quantity, origin e price. Il campo quantity viene inserito alla creazione di un nuovo product e aggiornato tramite classes alla creazione o alla cancellazione di un ordine. Il campo price viene utilizzato durante la creazione di quest'ultimo per il calcolo del costo sostenuto per ogni singolo utente e del totale complessivo.

#### Orders-archieve

Le risorse Orders sono composte da:

• orderid - id dell'ordine con composizione "order000000" - per velocizzare le ricerche in caso di richiesta GET/:orderid sarà sufficente inserire la parte numerica (GET/:000000)
• users - array contenente objects con:
•• username - username dell'utente
•• products - array contente objects con:
••• productname - nome del prodotto ordinato
••• quantity - quantità di tale prodotto
•• cost - costo sostenuto dal singolo utente
• shipped - indicazione se un ordine é stato spedito o meno
• date - data di creazione di un ordine
• totalcost - totale dell'ordine calcolato e aggiunto automaticamente

:heavy_plus_sign: rispetto alla consegna data sono stati aggiunti dettagli agli utenti e ai prodotti che compongono l'ordine, come per esempio la quantità di un determinato prodotto, ed essendo il contesto nell'ambito dei gruppi d'acquisto ho voluto includere un field per il costo sostenuto da ogni singolo utente per la propria parte di ordine, calcolato e aggiunto ai dati forniti nella POST request, che comporrà la risorsa all'interno del Database. I campi aggiuntivi shipped e date potrebbero tornare utili per un futuro aggiornamento o utilizzo del progetto a fini pratici, ma come per il calcolo del costo totale dell'ordine, sono serviti principalmente come ulteriore esercizio pratico nella creazione di API e per un senso di completezza.

<hr>

### Testing

Per lo unit-testing delle API ho utilizzato Sinon come consigliato e, anche se é stato uno degli scogli più duri del progetto, soprattutto entrando nell'ambito classes di JavaScript, mi é servito per migliorare il codice principale e capire in modo più profondo le logiche che regolano Node.js e le API.<br>
I massimi risultati che sono riuscito ad ottenere:<br>

<div align="center">
<img src="https://i.ibb.co/QM9Yxsk/testing-node-project.png alt="testing-node-project" width="80%" height="80%">
</div><br>

Per ottenere un risultato più completo nel testing ho usato inoltre i pacchetti sinon-mongoose e sinon-express-mock.

<hr>

### NoSQLInjections

La validazione di ogni input viene effettuata dalla combinazione di Joi (ex hapi/joi) e Celebrate, utilizzando parametri abbastanza stringenti basati sui rispettivi Models, come spiegato e consigliato in questa conferenza:
[Link](https://www.youtube.com/watch?v=xJWZsoYmsIE)

<hr>
<hr>

## Steps RESTful API

Fasi del progetto:

- [x] Routes, Naming, Methods and Status Codes study
- [x] MongoDB and Mongoose study
- [x] Simple internal MongoDB database creation
- [x] Simple database on MongoDB Atlas creation
- [x] Sinon.js stubs, mocks and spies study
- [x] Test code coverage instanbul/nyc
- [x] Highest possible percentage of coverage
- [x] Automate testing

Idee future:

- [ ] Utilizzare EJS per creare un file pdf riassuntivo e stampabile dell'ordine e salvato su DB

<hr>
<hr>

## Resources

Strumenti utilizzati:

- [Insomnia](https://insomnia.rest/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

Risorse utilizzate:

- [Start2Impact Courses](https://www.start2impact.it)
- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Coding Train "Working with Data and API" Playlist](https://www.youtube.com/playlist?list=PLRqwX-V7Uu6YxDKpFzf_2D84p0cyk4T7X)
- [Coding Garden Tutorials](https://www.youtube.com/c/CodingGarden)
- [Net Ninja Node.js for beginners](https://youtube.com/playlist?list=PL4cUxeGkcC9gcy9lrvMJ75z9maRw4byYp)

<hr>
<hr>

## Usage

<hr>
<hr>

## Demo

Si può provare dal link...

<hr>
<hr>

## License

Distributed under MIT License.

<br>
<p><a href="#begin">&#9650; Back to summary</a></p>

<hr>
<hr>

## Contacts

Alex<br>
[GitHub](http://https://github.com/Icarus1989)<br>
[Instagram](http://https://www.instagram.com/alex._.1989/)<br>
[Facebook](https://www.facebook.com/alex.valente.92)<br>

:link: [GitHub Repo of this project](https://github.com/Icarus1989/Planty-of-Food-RESTful-API-Start2Impact-Node.js-Project)

<br>
<p><a href="#begin">&#9650; Back to summary</a></p>
