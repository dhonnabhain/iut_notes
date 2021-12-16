import csv from 'csv-parser'
import fs from 'fs'
import { join } from 'path'

const dir = join(process.cwd(), 'notes')

export default function handler(req, res) {
  const results = []

  fs.createReadStream(`${dir}/${req.query.group.toUpperCase()}.csv`)
    .pipe(csv({ separator: ';' }))
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.status(200).json(results)
    })
}
