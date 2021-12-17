import upperFirst from 'lodash.upperfirst'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Student({ student, group }) {
  const notes = 0

  for (let item in student) {
    const note = parseInt(student[item])

    if (!isNaN(note)) {
      notes = notes + note
    }
  }

  const splitName = student.Nom.split(' ')
  const name = splitName
    .pop()
    .split('-')
    .map((part) => upperFirst(part.toLowerCase()))
    .join('-')

  const [note] = useState(notes)
  const [lastName] = useState(splitName.join(' '))
  const [firstName] = useState(name)
  const [path] = useState(`${group}/${encodeURIComponent(student.Nom)}`)

  return (
    <Link href={path}>
      <div className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200 hover:shadow-xl transition duration-100 cursor-pointer">
        <div className="w-full p-6 space-y-8">
          <div className="text-center space-y-1">
            <h4 className="text-gray-800 text-3xl font-bold truncate tracking-wide">
              {firstName}
            </h4>
            <h3 className="font-medium truncate text-gray-500">{lastName}</h3>
          </div>

          <div className="flex items-center">
            <div className="inline-block text-2xl font-bold mx-auto text-gray-900">
              <span className="text-indigo-500">{note}</span> / 20
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
