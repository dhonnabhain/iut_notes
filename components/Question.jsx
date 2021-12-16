import React from 'react'

export default function Question({ question }) {
  return (
    <li>
      <div className="block hover:bg-gray-50">
        <div className="px-4 py-4 flex items-center sm:px-6">
          <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
            <div className="truncate">
              <div className="flex text-sm">
                <p className="font-medium text-black truncate">
                  {question.question}
                </p>
              </div>
              <div className="mt-2 flex">
                <div className="flex items-center text-sm text-gray-500">
                  <time datetime={question.date}>Le {question.date}</time>
                </div>
              </div>
            </div>
          </div>
          <div className="ml-5 flex-shrink-0 text-2xl">
            <span className="text-indigo-500 font-bold">{question.note}</span> /{' '}
            <span className="text-gray-800">{question.scale}</span>
          </div>
        </div>
      </div>
    </li>
  )
}
