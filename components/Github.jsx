import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'

export default function Github() {
  return (
    <div className="flex justify-center w-full mt-8">
      <a
        href="https://github.com/dhonnabhain/iut_notes"
        target="_blank"
        rel="noreferrer"
        className="text-center text-4xl text-gray-800 hover:text-indigo-500 transition duration-150"
      >
        <FontAwesomeIcon icon={faGithub} className="self-center" />
      </a>
    </div>
  )
}
