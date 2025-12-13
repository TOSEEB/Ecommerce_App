/**
 * Loading Spinner Component
 * Reusable loading indicator with accessibility support
 * @module components/LoadingSpinner
 */

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  }

  return (
    <div className="flex flex-col items-center justify-center p-8" role="status" aria-live="polite">
      <div
        className={`inline-block animate-spin rounded-full border-b-2 border-primary-600 ${sizeClasses[size]}`}
        aria-hidden="true"
      ></div>
      {text && (
        <p className="mt-4 text-gray-600" aria-label={text}>
          {text}
        </p>
      )}
      <span className="sr-only">{text}</span>
    </div>
  )
}

export default LoadingSpinner

