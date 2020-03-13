# Stalker - Web App

Questo progetto è stato generato utilizzando [Angular CLI](https://github.com/angular/angular-cli) versione 9.0.5.

<!-- TODO add badges -->

## Setup dell'ambiente di lavoro

Prima di effettuare qualsiasi operazione scrivi da linea di comando `npm install`, in questo modo saranno installate tutte le dipende necessarie per il progetto.

## Development server

Scrivi da linea di comando `ng serve` per ottenere un server di sviluppo e vai all'indirizzo `http://localhost:4200/`.
La web app si aggiornerà automaticamente dopo qualsiasi cambiamento ai file sorgente.

## Setup del codice

Scrivi `ng generate component component-name` per generare un nuovo componente.
Puoi anche usare `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Scrivi `ng build` per effettuare la build del progetto. L'artefatto di build si troverà nella cartella `dist/`. Usa la flag `--prod` per una build di produzione.

## Eseguire i test di unità

Scrivi `ng test` per eseguire i test di unità tramite [Karma](https://karma-runner.github.io).

## Eseguire i test end-to-end

Scrivi `ng e2e` per eseguire i test end-to-end tramite[Protractor](http://www.protractortest.org/).

## Aiuto

Per ricevere info sui comandi di Angular CLI scrivi `ng help` o controlla [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Incremento di versione

Per incrementare rilasciare una nuova versione è sufficiente scrivere `npm run release`: questo comando aumenterà il numero di versione e creerà un CHANGELOG per la versione corrente basandosi sui commit presenti.
Per pubblicare la release bisogna scrivere `git push`.
