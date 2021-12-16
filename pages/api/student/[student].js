import csv from 'csv-parser'
import fs from 'fs'
import { join } from 'path'

const dir = join(process.cwd(), 'notes')
const scale = {
  // Y
  'Où s’exécute un fichier php ?': { scale: 2, date: '15/09/21' },
  'Quelle différence entre tableau associatif et indicé ?': {
    scale: 3,
    date: '23/09/21',
  },
  'Comment écrit-on un si alors sinon si ?': { scale: 2, date: '01/10/21' },
  'Lister les 2 variables superglobales qui récupèrent les données des formulaires et comment.':
    { scale: 3, date: '08/10/21' },

  // Y1
  'Un fichier.php doit-il contenir du php ?': { scale: 2, date: '19/11/21' },
  'Comment fermer une connexion $bdd à la BDD ?': {
    scale: 2,
    date: '08/12/21',
  },
  'Que se passe-t-il si action=" " ?': { scale: 2, date: '10/12/21' },

  // Y2
  'Comment reconnait-on une variable PHP ?': { scale: 1, date: '26/11/21' },
  'Quelle différence entre post et get ?': { scale: 3, date: '03/12/21' },

  // T
  'Quel est l’intérêt du session_start() ?': { scale: 3, date: '12/11/21' },
  'Que produit la méthode fetchAll ?': { scale: 3, date: '29/11/21' },
}

export default function handler(req, res) {
  const results = []

  fs.createReadStream(`${dir}/${req.query.group.toUpperCase()}.csv`)
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      const student = results.filter((row) => row.Nom === req.query.student)[0]
      const notes = Object.keys(student)
        .filter((key) => key !== '' && key !== 'Nom')
        .map((key) => {
          const trimmed = key.trim()

          return {
            question: trimmed,
            note: student[key],
            ...scale[trimmed],
          }
        })

      res.status(200).json(notes)
    })
}
