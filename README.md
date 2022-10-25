<hr>
<hr>

<div align="center">
<h1><i>:leafy_green: :tomato: :potato: Planty Of Food RESTful API :watermelon:  :pineapple: :green_apple:</i></h1>
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

<hr>

#### Users

Le risorse Users sonon composte da...

#### Products-storage

Le risorse Products sonon composte da...

#### Orders-archieve

Le risorse Orders sonon composte da...

<hr>

### Testing

...

<hr>

### NoSQLInjections

...

<hr>
<hr>

## Steps RESTful API

- [x] Routes, Naming, Methods and Status Codes study
- [x] MongoDB and Mongoose study
- [x] Simple internal MongoDB database creation
- [x] Simple database on MongoDB Atlas creation
- [x] Sinon.js stubs, mocks and spies study
- [x] Test code coverage instanbul/nyc
- [x] Highest possible percentage of coverage
- [x] Automate testing

<hr>
<hr>

## Resources

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

:link: [GitHub Repo of this project](https://github.com/Icarus1989/how-is-there--lifestyle-web-app)

<br>
<p><a href="#begin">&#9650; Back to summary</a></p>
