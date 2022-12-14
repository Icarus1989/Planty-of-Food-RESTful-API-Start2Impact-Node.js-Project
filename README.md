<hr>
<div align="center">
<hr>
<h1><i>Planty Of Food RESTful API <br>
 :articulated_lorry: :package: :strawberry: :pear: :carrot: :leafy_green:</i></h1>
 <hr>
</div>

### Questo é un progetto per la conclusione della **Super Guida Node.js** di **Start2Impact**, categoria Food.

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
          <li><a href="#rest-architecture">REST Architecture</a></li>
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
          <li><a href="#nosql-injections">NoSQL Injections</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#resources">Resources</a>
    <li><a href="#usage">Usage</a></li>
    <li><a href="steps">Steps</a></li>
    <li><a href="host">Host</a></li>
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

Questo progetto mira ad ottenere delle API funzionanti per connettere un ecommerce con dei gruppi d'acquisto per conto di Planty Of Food, azienda che opera nel settore del cibo plant based.<br>

Ho voluto ampliare la consegna data per il progetto arricchendo le varie risorse con ulteriori campi e funzionalità, come per esempio l'inserimento del prezzo di un prodotto e il calcolo del totale di un ordine, cercando comunque di restare pertinente al contesto fornito con features utili ad un eventuale uso in un'applicazione reale.

Tra i due database proposti ho preferito optare per MongoDB visto che, proprio grazie al fatto di voler imparare ad usarlo per migliorare ed ampliare il [progetto precedente](https://github.com/Icarus1989/how-is-there--lifestyle-web-app), ho scelto di cominciare questa guida di Node.js, capendone l'importanza anche in senso più ampio.

<hr>

### REST Architecture

Basandomi su quanto appreso nelle varie guide, ho cercato di creare queste API seguendo il più possibile le linee guida RESTful:

- un'architettura stateless

- una divisione netta tra client e server - la composizione finale degli ordini, con il calcolo degli importi per ogni singolo utente e il totale ed il salvataggio di tale order,viene eseguita interamente dal server, come anche ogni controllo di esistenza delle risorse

- un sistema diviso con una logica a layers - separando database e server, diviso a sua volta tra la route base e poi tra le tre route principali a loro volta divise tra models, controllers, routes e classes, in modo da separare nel modo migliore possibile tutte le logiche

- un'interfaccia di comunicazione (Uniform Interface) omogenea e che permette la sua modifica a blocchi separatamente, non richiedendo però modifiche dal client, che si baserà sempre sulle stesse URI per accedere alle API

- le risorse sono autodescrittive - così come per il codice, i nomi di tutte le risorse sono stati creati per essere il più possibile human-readable

<hr>

### Naming

Ho prestato particolare attenzione al naming delle resources, ragionado su quali potevano essere i più corretti applicati al contesto di Planty of Food. Da questo per esempio i tre gruppi principali: Users, Products-Storage e Orders-Archieve.

<hr>

### Methods

Per tutti i gruppi di risorse presenti, users, products e orders, ho creato dei metodi uniformi per la gestione dei dati:

- **_GET_** - diviso tra GET e GET/:id per ottenere l'intero insieme di risorse o una solamente basandosi sulla ricerca di un id.

- **_POST_** - per la creazione di nuove risorse

- **_PUT_** - per la modifica di risorse esistenti

- **_DELETE_** - per la cancellazione di risorse esistenti.

<hr>

### Status Code

Gli status code di risposta delle API sono basati sulla lista fornita ed inseriti ponendo particolare attenzione al fatto che la risposta arrivi o no e che sia positiva o negativa.

<hr>

### Database

Come Database ho scelto di utilizzare MongoDB tramite il servizio Atlas.
All'interno del Database PlantyOfFood vi sono le tre collezioni necessarie per la gestione delle risorse: Users, Products-Storage e Orders-Archieve.

#### Users

Le risorse Users sono composte da:

- firstname - nome <br>
- lastname - cognome <br>
- username - sul quale si basa la ricerca tramite GET/:username <br>
- address - indirizzo email <br>
- orders - array di objects composti da id dell'ordine e url dello stesso <br>
- date - data di registrazione ( semplice creazione in questo progetto ) <br>

:heavy_plus_sign: rispetto alla consegna data alle risorse users sono stati aggiunti i campi date, username e orders. Quest'ultimo in particolare verrà aggiornato all'inserimento o alla cancellazione di un ordine.

#### Products-storage

Le risorse Products sono composte da:

- name - nome del prodotto <br>
- quantity - kilogrammi di un determinato prodotto in magazzino <br>
- origin - origine di un prodotto <br>
- price - prezzo al kilogrammo di un determinato prodotto <br>

:heavy_plus_sign: rispetto alla consegna data alle risorse products sono stati aggiunti i campi quantity, origin e price. Il campo quantity viene inserito alla creazione di un nuovo product e aggiornato tramite classes alla creazione o alla cancellazione di un ordine mentre il campo price viene utilizzato durante la creazione di quest'ultimo per il calcolo del costo sostenuto per ogni singolo utente e del totale complessivo.

#### Orders-archieve

Le risorse Orders sono composte da:

- orderid - id dell'ordine con composizione "order000000"
- users - array contenente objects con:
  - username - username dell'utente <br>
  - products - array contente objects con:
    - productname - nome del prodotto ordinato <br>
    - quantity - quantità di tale prodotto
  - cost - costo sostenuto dal singolo utente <br>
- shipped - indicazione se un ordine é stato spedito o meno <br>
- date - data di creazione di un ordine <br>
- totalcost - totale dell'ordine calcolato e aggiunto automaticamente <br>

:heavy_plus_sign: rispetto alla consegna data sono stati aggiunti dettagli come per esempio la quantità di un determinato prodotto, ed essendo il contesto nell'ambito dei gruppi d'acquisto, ho voluto includere un field per il costo sostenuto da ogni singolo utente per la propria parte di ordine, calcolato e aggiunto ai dati forniti nella POST request, che comporrà la risorsa all'interno del Database. I campi aggiuntivi shipped e date potrebbero tornare utili per un futuro aggiornamento o utilizzo del progetto a fini pratici, ma come per il calcolo del costo totale dell'ordine, sono serviti principalmente come ulteriore esercizio pratico nella creazione di API e per un senso di completezza.

<hr>

### Testing

Per lo unit-testing delle API ho utilizzato Sinon.js come consigliato e, anche se é stato uno degli scogli più duri del progetto, soprattutto entrando nell'ambito delle Classes di JavaScript, mi é servito per migliorare il codice principale e capire in modo più profondo le logiche che regolano Node.js e le API.<br>
I massimi risultati che sono riuscito ad ottenere:<br>

<div align="center">
<img src="https://i.ibb.co/JzXGMKm/testing-node-results.png" alt="testing-node-project" width="60%" height="60%">
</div>
<br>

Per ottenere un risultato più completo nel testing ho usato inoltre i pacchetti sinon-mongoose e sinon-express-mock.

<hr>

### NoSQL Injections

La validazione di ogni input viene effettuata dalla combinazione di Joi (ex hapi/joi) e Celebrate, utilizzando parametri abbastanza stringenti basati sui rispettivi Models, come spiegato e consigliato in questa conferenza:
[Link](https://www.youtube.com/watch?v=xJWZsoYmsIE)

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

L'utilizzo di queste API necessita di un programma per la gestione delle requests come Insomnia oppure creare un client-side adatto usando le URI descritte.

La route principale "/" risponderà ad una GET request con un semplice benvenuto.

L'accesso alle risorse avverrà dagli endpoint **_/api/v1/users/_**, **_/api/v1/products-storage/_**, **_/api/v1/orders-archieve/_**.

Per le risorse **Users**:

- una GET request con endpoint **_"/users/"_** darà come risposta la totalità dei prodotti presenti nella collection, ad una GET request con URL **_"/users/:userid"_** risponderà con il relativo User con userid corrispondente, basato sul field **username**, oppure con un message che segnalerà la non esistenza di tale User

- per poter inserire un nuovo User con una POST request occorrerà usare l'endpoint **_"/users/"_** e fornire un body in formato JSON, che dovrà rispettare i parametri dei field che compongono le risorse: **firstname**, **lastname**, **username**, **address**, **date** (altrimenti aggiunto automaticamente) e **orders** (che può essere anche un Array vuoto). Dopo aver inviato la POST request e andata a buon fine, la risposta sarà lo User stesso oppure, in caso negativo, un message adatto.

- per modificare una risorsa si usi una PUT request con endpoint **_"/users/:userid"_** con userid corrispondente allo **username** della risorsa e body completo con la modifica desiderata. La response positiva corrisponderà alla risorsa modificata.

- per cancellare una risorsa si usi una DELETE request con endpoint **_"/users/:userid"_** con userid corrispondente allo **username** della risorsa. La response sarà la risorsa stessa.
<br>
<div align="center">
<img src="https://i.ibb.co/1bxZhNG/Schermata-2022-10-28-alle-12-09-26.png" alt="User Composition" width="40%" height="40%">
</div>
<br>

Per le risorse **Product**:

- una GET request con endpoint **_"/products-storage/"_** darà come risposta la totalità dei prodotti presenti nella collection, ad una GET request con URL **_"/products-storage/:prodid"_** risponderà con il relativo prodotto con prodid corrispondente, basato sul field **name**, oppure con un message che segnalerà la non esistenza di tale Product

- per poter inserire un nuovo Product con una POST request occorrerà usare l'endpoint **_"/products-storage/"_** e fornire un body in formato JSON, che dovrà rispettare i parametri dei quattro field che compongono le risorse: **name**, **origin**, **price**, **quantity**. Dopo aver inviato la POST request e andata a buon fine, la risposta sarà il Product stesso oppure, in caso negativo, un message adatto.

- per modificare una risorsa si usi una PUT request con endpoint **_"/products-storage/:prodid"_** con prodid corrispondente al **name** del Product e body completo con la modifica desiderata. La response positiva corrisponderà alla risorsa modificata

- per cancellare una risorsa si una DELETE request con endpoint **_"/products-storage/:prodid"_** con prodid corrispondente al **name** del Product. La response sarà la risorsa stessa.
<br>
<div align="center">
<img src="https://i.ibb.co/xMVKqcr/Schermata-2022-10-28-alle-00-39-08.png" alt="Product Composition" width="40%" height="40%">
</div>
<br>

Per le risorse **Orders**:

- una GET request con endpoint **_"/orders-archieve/"_** darà come risposta la totalità dei prodotti presenti nella collection, che potranno essere riordinati e filtrati in base ai query parameters inseriti nell'URI:

  - filter - uno tra productname, username, shipped, \_id, orderid, date
  - value - la value del filter per la quale filtrare i risultati
  - order - parametro di riferiemento per l'ordine - stesse value del filter
  - sort - uno tra increasing e decreasing

    i.e. **_"/orders-archieve?filter=productname&value=strawberries&order=orderid&sort=increasing"_**

La ricerca può essere effettuata sia utilizzando tutti i parametri, sia senza utilizzarli, sia utilizzando solo i parametri filter e value, sia solo con order e sort. In caso di utilizzo di filter senza value o viceversa oppure di order senza sort e viceversa, la response sarà un messaggio di errore che indicherà la mancanza del parametro necessario.

- una GET request con endpoint **_"/orders-archieve/:ordnum"_** risponderà con il relativo Order con ordnum corrispondente oppure con un message che segnalerà la non esistenza di tale Order. Il parametro di ricerca "ordnum" é basato sul field **orderid** senza la componente "order" (i.e. ~~order~~999999).

- per poter inserire un nuovo Order con una POST request occorrerà usare l'endpoint **_"/orders-archieve/"_** e fornire un body in formato JSON, che dovrà rispettare i parametri dei field che compongono le risorse: **orderid**, **users** (struttura complessa vedi immagine), **date** e **shipped**. Verranno inoltre calcolati ed aggiunti i fields cost e totalcost basati sul field price delle risorse Product e relativa quantity. Dopo aver inviato la POST request e andata a buon fine, la risposta sarà l'Order stesso oppure, in caso negativo, un message adatto. I field hanno dei parametri di default per velocizzare le request soprattutto a scopo dimostrativo. Tramite l'utilizzo di classes JavaScript le risorse User e Product coinvolte verranno aggiornate, aggiungendo alle risorse User il nuovo Order e modificando le quantità nelle risorse Product.

- per modificare una risorsa si usi una PUT request con URL **_"/orders-archieve/:ordnum"_** con ordnum corrispondente all'**orderid** della risorsa senza la componente "order" (i.e. ~~order~~999999) e body completo con la modifica desiderata. La response positiva corrisponderà alla risorsa modificata.

- per cancellare una risorsa si usi una DELETE request con URL **_"/orders-archieve/:ordnum"_** con userid corrispondente all'**orderid** della risorsa senza la componente "order" (i.e. ~~order~~999999). La response sarà la risorsa stessa. Tramite l'utilizzo di classes JavaScript le risorse User e Product coinvolte verranno aggiornate, rimuovendo dalle risorse User la risorsa Order cancellata e modificando le quantità delle risorse Product.
<br>
<div align="center">
<img src="https://i.ibb.co/HBfnsb2/Schermata-2022-10-28-alle-00-16-13.png" alt="Order composition" width="40%" height="40%">
</div>
<br>
Nota generale per l'utilizzo delle routes: se i fields indicati nel body non corrispondessero alle indicazioni impostate con Celebrate, avverrà un errore di validazione con status 500.

<hr>
<hr>

## Steps RESTful API

**Project steps**:

- [x] Routes, Naming, Methods and Status Codes study
- [x] MongoDB and Mongoose study
- [x] Simple internal MongoDB database creation
- [x] Simple database on MongoDB Atlas creation
- [x] Sinon.js stubs, mocks and spies study
- [x] Test code coverage instanbul/nyc
- [x] Highest possible percentage - unit test code coverage
- [x] Deploy on Glitch.com - added .npmrc file

**Future ideas**:

- [ ] Use EJS for create a .pdf file with a printable order summary and save it on DB

<hr>
<hr>

## Host

Anche se non necessario dalle specifiche del progetto, ho preferito pubblicarlo per completezza e per renderne più accessibile la visione e la fruizione.
Come servizio di hosting per questo progetto ho scelto [Glitch.com](https://glitch.com/), continuando così a differenziare per ogni nuovo progetto, in modo da apprendere il più possibile.

- [x] GitHub Pages
- [x] Firebase
- [x] Heroku
- [x] Glitch
- [ ] Netlify
- [ ] ...

## Demo

E' possibile utilizzare una versione totalmente funzionante del progetto, collegata ad un database MongoDB attivo, dal link incluso solo nella presentazione, utilizzando Insomnia o altri tool per la gestione delle API.
Si consiglia di effettuare una GET request con endpoint "/", o di cliccare semplicemente sull'icona del link, prima di provare ad inviare dati per disabilitare la modalità sleep, imposta dal servizio di hosting dopo 5 minuti di inattività per i piani gratuiti.

In alternativa si può clonare la repository.

<hr>
<hr>

## License

MIT License.

<br>
<p><a href="#begin">&#9650; Back to summary</a></p>

<hr>
<hr>

## Contacts

Alex<br>
[GitHub](http://https://github.com/Icarus1989)<br>
[Linkedin](https://www.linkedin.com/in/alex-valente-018586156/)<br>
[Instagram](http://https://www.instagram.com/alex._.1989/)<br>
[Facebook](https://www.facebook.com/alex.valente.92)<br>

:link: [GitHub Repo of this project](https://github.com/Icarus1989/Planty-of-Food-RESTful-API-Start2Impact-Node.js-Project)

<br>
<p><a href="#begin">&#9650; Back to summary</a></p>
