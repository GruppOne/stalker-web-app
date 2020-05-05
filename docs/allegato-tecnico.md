# Allegato tecnico

Ogni diagramma presente in questo documento e tutti quelli delle singole classi che compongono l'architettura sono consultabili nella cartella `diagrams/img`

## Web-App

### Architettura

La web application del progetto Stalker si appoggia al design pattern architetturale Model-View-ViewModel di cui riportiamo un esempio applicato al nostro caso.

### Visione complessiva

Questo diagramma fornisce la visione complessiva di tutte le componenti che compongono l'architettura della web-application, compresi i package da importare necessari per il corretto funzionamento dell'interfaccia web.

![alt text](./diagrams/out/class_diagram/Class%20Diagram.png)

### Design pattern creazionali

Il progetto richiedeva l'utilizzo di risorse non disponibili interamente da subito o che sarebbero state costruite in modo incompleto in alcune situazioni, è stato dunque utilizzato il Builder Pattern per la creazione dei modelli che dovevano essere richiesti dal server o costruiti in modo incompleto.

#### User

![alt text](./diagrams/out/design-pattern/userbuilderpattern/User%20builder%20design%20pattern%20diagram.png)

#### Organization

![alt text](./diagrams/out/design-pattern/OrganizationBuilderPattern/Organization%20builder%20design%20pattern%20diagram.png)

### Features

Di seguito riportiamo i diagrammi contenenti le classi necessarie al funzionamento delle major features che abbiamo implementato

#### Autenticazione e Autorizzazione

![alt text](./diagrams/out/features/authentication/authentication%20and%20authorization%20classes.png)

#### Creazione Organizzazione

![alt text](./diagrams/out/features/createorganization/create%20organization%20classes.png)

#### Gestione Amministratori

![alt text](./diagrams/out/features/editadministrator/edit%20administrators.png)

#### Gestione Organizzazione e Luoghi

![alt text](./diagrams/out/features/editorganization/Edit%20Organization%20classes.png)

#### Login

![alt text](./diagrams/out/features/home/Home%20classes.png)

#### Visualizzazione Organizzazione

![alt text](./diagrams/out/features/organization/organization%20classes.png)

#### Visualizzazione lista di Organizzazioni

![alt text](./diagrams/out/features/organizations/organizations%20classes.png)

#### Visualizzazione e gestione Profilo

![alt text](./diagrams/out/features/profile/profile%20classes.png)

#### Chiamate Http con API REST

![alt text](./diagrams/out/features/services/http%20calls%20to%20API%20through%20services%20diagram.png)

### Diagrammi di sequenza

Di seguito riportiamo un diagramma di sequenza che rappresenta la visualizzazione di un utente del proprio profilo. Il passaggio di dati dal componente al servizio designato che in seguito utilizzerà il servizio `HttpClientService` per fare una richiesta http al server Stalker è simile per tutte le altre funzionalità.

#### Visualizzazione profilo

![alt text](./diagrams/img/docs/diagrams/sequences/showprofile/profile%20sequence%20diagram.png)

### Diagramma di package

Infine riportiamo un diagramma dei package interni alla nostra applicazione web.

![alt text](./diagrams/out/package-diagram/Package%20Diagram.png)
