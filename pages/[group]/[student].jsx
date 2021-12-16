import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Question from '../../components/Question'
import Head from 'next/head'

export default function StudentPage() {
  const { query } = useRouter()
  const [notes, setNotes] = useState([])
  const [student] = useState(query.student)

  useEffect(() => {
    axios
      .get(`/api/student/${query.student}?group=${query.group}`)
      .then((res) => {
        if (Object.keys(query).length > 0) {
          setNotes(res.data)
        }
      })
  }, [query])

  return (
    <div>
      <Head>
        <title>PHP | {student}</title>
        <meta name="description" content={`PHP notes pour ${student}`} />
      </Head>

      <main>
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex space-x-7">
            <Link href="/">
              <div className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                Retour
              </div>
            </Link>
            <h1 className="text-2xl font-semibold text-gray-700">{student}</h1>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {notes.map((note) => (
                    <Question question={note} key="note.question" />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
