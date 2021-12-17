import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Loader() {
  return (
    <div className="flex justify-center w-full mt-8 animate-spin text-5xl text-gray-600">
      <FontAwesomeIcon icon={faSpinner} className="self-center" />
    </div>
  )
}
