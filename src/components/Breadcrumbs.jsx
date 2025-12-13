import { Link } from 'react-router-dom'
import { FiHome, FiChevronRight } from 'react-icons/fi'

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <Link
        to="/"
        className="text-gray-500 hover:text-primary-600 transition-colors flex items-center"
      >
        <FiHome className="w-4 h-4" />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          {index === items.length - 1 ? (
            <span className="text-gray-900 font-medium">{item.label}</span>
          ) : (
            <Link
              to={item.path}
              className="text-gray-500 hover:text-primary-600 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

export default Breadcrumbs

