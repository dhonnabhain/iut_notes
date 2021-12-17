import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Question from '../../components/Question'
import Head from 'next/head'
import Loader from '../../components/Loader'

function reducer(src, item) {
  return src.reduce((prev, curr) => {
    const parsed = parseInt(curr[item])

    return isNaN(parsed) ? prev : prev + parsed
  }, 0)
}

export default function StudentPage() {
  const { query } = useRouter()
  const [notes, setNotes] = useState([])
  const [student] = useState(query.student)
  const [sum, setSum] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios
      .get(`/api/student/${query.student}?group=${query.group}`)
      .then((res) => {
        if (Object.keys(query).length > 0) {
          setNotes(res.data)
          setSum(reducer(res.data, 'note'))
          setIsLoading(false)
        }
      })
  }, [query])

  return (
    <div className="relative">
      <Head>
        <title>PHP | {student}</title>
        <meta name="description" content={`PHP notes pour ${student}`} />
      </Head>

      <main className="bg-gray-100">
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex space-x-7">
            <Link href="/">
              <div className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                Retour
              </div>
            </Link>
            <h1 className="text-2xl font-semibold text-gray-700 self-center">
              {student}
            </h1>
            <p className="text-2xl self-center">
              <span className="text-indigo-500 font-black">{sum}</span> / 20
            </p>
          </div>

          {isLoading && <Loader />}

          {!isLoading && (
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
          )}
        </div>
      </main>
    </div>
  )
}
