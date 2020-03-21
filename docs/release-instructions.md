# Istruzioni per effettuare una release

## Preparazione

- Generare il changelog automatico eseguendo `npm run prepare-release`
- Effettuare un `git push` del commit generato automaticamente
- Marcare la PR come "Ready for review"
- Attendere che i verificatori completino la Code Review

## Release

Quando i verificatori hanno completato la Code Review:

- Effettuare un `Merge` della PR (squash o normale)
- Posizionarsi su `master` e assicurarsi che sia up to date con `git pull origin master`
- Eseguire `npm run tag-release`
- Effettuare un push della tag, utilizzando il comando scritto nell'output dello step precedente
