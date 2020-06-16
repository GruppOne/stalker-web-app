# Report Web Application

## Scelte implementative

Per realizzare la web application è stato scelto il framework Angular per la sua diffusione e per la molta documentazione presente sul framework.
Si è scelto di usare le seguenti librerie:

- **Angular Material** ­~9.2.1 per lo stile frontend
- **ngx-leaflet** ~6.0.1 per la visualizzazione delle mappe
- **ngx-leaflet-draw** ~5.0.1 per rendere disponibili mappe interattive
- **Chart.js** ~2.9.3 per la visualizzazione di grafici in tempo reale

Per ulteriori dettagli riguardo alle scelte implementative si rimanda al _manuale manutentore_ disponibile nella documentazione ufficiale di progetto.

## Test

### Test Unitari

Sono stati eseguiti test di unità per tutti i servizi, componenti e guardie della web application.

È stata raggiunta una code coverage dell'85%, compatibile con gli obiettivi imposti dal capitolato.

### Test e2e

Per i test end-to-end è stato scelto di utilizzare il framework protractor accompagnato a cucumber per la stesura di test autoesplicativi.

## Problemi aperti

Abbiamo pensato ai seguenti elementi come possibili estensione dell'applicazione web:

- Visualizzazione di un report più dettagliato dell'affluenza ai luoghi dell'organizzazione nel corso del tempo
- Inserimento immagine del profilo utente
- Possibilità di limitare il numero di luoghi e la loro estensione in base al piano di abbonamento scelto.
