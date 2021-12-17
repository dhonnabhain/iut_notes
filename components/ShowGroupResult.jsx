import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Student from './Student'

export default function ShowGroupResult({ group }) {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    axios.get(`/api/group/${group}`).then((res) => setNotes(res.data))
  }, [])

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 mb-7">
        <h1 className="text-5xl font-black tracking-wide text-gray-900">
          Groupe {group.toUpperCase()}
        </h1>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {notes.map((note) => {
          return <Student student={note} group={group} key={note.Nom} />
        })}
      </div>
    </div>
  )
}
