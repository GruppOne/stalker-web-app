# Allegato tecnico

Ogni diagramma presente in questo documento e tutti quelli delle singole classi che compongono l'architettura sono consultabili nella cartella `diagrams/img`

# Web App

## Architettura

La web-application del progetto Stalker si appoggia al design pattern architetturale Model-View-ViewModel di cui riportiamo un esempio applicato al nostro caso.

## Visione complessiva

Questo diagramma fornisce la visione complessiva di tutte le componenti che compongono l'architettura della web-application, compresi i package da importare necessari per il corretto funzionamento dell'interfaccia web.

![alt text](./diagrams/img/docs/diagrams/class_diagram/Class%20Diagram.png)

## Design pattern creazionali

Il progetto richiedeva l'utilizzo di risorse non disponibili interamente da subito o che sarebbero state costruite in modo incompleto in alcune situazioni, è stato dunque utilizzato il Builder Pattern per la creazione dei modelli che dovevano essere richiesti dal server o costruiti in modo incompleto.

### User

### UserData

### Organization

### Place

### PlaceData

### LdapConfiguration

## Features

Di seguito riportiamo i diagrammi contenenti le classi necessarie al funzionamento delle major features che abbiamo implementato

### Autenticazione e Autorizzazione

### Creazione Organizzazione

### Gestione Amministratori

### Gestione Organizzazione e Luoghi

### Login

### Visualizzazione Organizzazione

### Visualizzazione lista di Organizzazioni

### Visualizzazione e gestione Profilo

### Chiamate Http con API REST

## Diagrammi di sequenza

Di seguito riportiamo un diagramma di sequenza che rappresenta la visualizzazione di un utente del proprio profilo. Il passaggio di dati dal componente al servizio designato che in seguito utilizzerà il servizio `HttpClientService` per fare una richiesta http al server Stalker è simile per tutte le altre funzionalità.

### Visualizzazione profilo

![alt text](./diagrams/img/docs/diagrams/sequences/showprofile/profile%20sequence%20diagram.png)
