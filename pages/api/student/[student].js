import csv from 'csv-parser'
import fs from 'fs'
import { join } from 'path'

const dir = join(process.cwd(), 'notes')
const scale = {
  'Où s’exécute un fichier php ?': {
    scale: 2,
    date: '15/09/21',
    answer: 'Serveur',
  },
  'Quelle différence entre tableau associatif et indicé ?': {
    scale: 3,
    date: '23/09/21',
    answer: 'indice = des numeros à partir de 0, associatif = des noms ',
  },
  'Comment écrit-on un si alors sinon si ?': {
    scale: 2,
    date: '01/10/21',
    answer: 'if else elseif',
  },
  'Lister les 2 variables superglobales qui récupèrent les données des formulaires et comment.':
    {
      scale: 3,
      date: '08/10/21',
      answer:
        '$_POST et $_GET par le champ action du formulaire et le bouton submit',
    },

  'Un fichier.php doit-il contenir du php ?': {
    scale: 2,
    date: '19/11/21',
    answer: 'Non il peut ne contenir que de l’HTML',
  },
  'Comment fermer une connexion $bdd à la BDD ?': {
    scale: 2,
    date: '08/12/21',
    answer: '$bdd = null',
  },
  'Que se passe-t-il si action=" " ?': {
    scale: 2,
    date: '10/12/21',
    answer: 'on reste sur la même page',
  },

  'Comment reconnait-on une variable PHP ?': {
    scale: 1,
    date: '26/11/21',
    answer: 'Elle commence par un $',
  },
  'Quelle différence entre post et get ?': {
    scale: 3,
    date: '03/12/21',
    answer: 'post envoie plus que get. get passe par l’url ',
  },
  'Ecrire un formulaire contenant une liste déroulante avec les deux format jpg et png, avec png présélectionné.':
    {
      scale: 3,
      date: '17/12/21',
      answer:
        '<FORM> <SELECT name="nom" size="1"> <OPTION value="jpg">jpg <OPTION selected value ="png"> png </SELECT> </FORM>',
    },
  'D’où interroger un fichier php ?': {
    scale: 1,
    date: '17/12/21',
    answer: 'une machine cliente',
  },
  'Différence entre isset et empty.': {
    scale: 2,
    date: '17/12/21',
    answer: 'isset vérifie l’existence, empty vérifie que c’est renseigné ',
  },

  'Quel est l’intérêt du session_start() ?': {
    scale: 3,
    date: '12/11/21',
    answer:
      'Donner accès à $_SESSION qui permet de transmettre des informations d’une page du site à l’autre ',
  },
  'Que produit la méthode fetchAll ?': {
    scale: 3,
    date: '29/11/21',
    answer:
      'Une matrice associative avec les numeros de ligne indicés et les colonnes correspondants aux champs de la requête ',
  },
  'Afficher le login de la seconde instance de cette commande : $t=$req->fetchAll();':
    {
      scale: 4,
      date: '06/01/22',
      answer: "echo $t[1]['login']",
    },

  'Quels sont les opérateurs logiques et comment les utiliser ?': {
    scale: 4,
    date: '10/01/22',
    answer: '|| = OR, && = AND, if ((x>3) || (x<5))',
  },
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
