import { createContext, useContext, useState, useCallback } from 'react'
import { FiCheckCircle, FiXCircle, FiInfo, FiAlertCircle, FiX } from 'react-icons/fi'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random()
    const toast = { id, message, type, duration }
    
    setToasts(prev => [...prev, toast])

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  const success = useCallback((message, duration) => {
    return showToast(message, 'success', duration)
  }, [showToast])

  const error = useCallback((message, duration) => {
    return showToast(message, 'error', duration)
  }, [showToast])

  const info = useCallback((message, duration) => {
    return showToast(message, 'info', duration)
  }, [showToast])

  const warning = useCallback((message, duration) => {
    return showToast(message, 'warning', duration)
  }, [showToast])

  const confirm = useCallback((message, onConfirm, onCancel) => {
    const id = Date.now() + Math.random()
    const toast = {
      id,
      message,
      type: 'confirm',
      onConfirm: () => {
        onConfirm?.()
        removeToast(id)
      },
      onCancel: () => {
        onCancel?.()
        removeToast(id)
      },
      duration: 0, // Don't auto-dismiss
    }
    
    setToasts(prev => [...prev, toast])
    return id
  }, [removeToast])

  const value = {
    toasts,
    showToast,
    removeToast,
    success,
    error,
    info,
    warning,
    confirm,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  )
}

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md w-full px-4 sm:px-0">
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  )
}

const Toast = ({ toast, removeToast }) => {
  const { id, message, type } = toast

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="w-5 h-5" />
      case 'error':
        return <FiXCircle className="w-5 h-5" />
      case 'warning':
        return <FiAlertCircle className="w-5 h-5" />
      case 'confirm':
        return <FiInfo className="w-5 h-5" />
      default:
        return <FiInfo className="w-5 h-5" />
    }
  }

  const getStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'confirm':
        return 'bg-blue-50 border-blue-200 text-blue-800'
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800'
    }
  }

  if (type === 'confirm') {
    return (
      <div className={`${getStyles()} border rounded-lg shadow-xl p-4 animate-slide-in`}>
        <div className="flex items-start">
          <div className="flex-shrink-0 mt-0.5">
            {getIcon()}
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{message}</p>
            <div className="mt-3 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={toast.onConfirm}
                className="btn-primary text-sm py-2 px-4 w-full sm:w-auto"
              >
                Confirm
              </button>
              <button
                onClick={toast.onCancel}
                className="btn-secondary text-sm py-2 px-4 w-full sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
          <button
            onClick={() => removeToast(id)}
            className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600"
          >
            <FiX className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={`${getStyles()} border rounded-lg shadow-xl p-4 animate-slide-in flex items-start`}>
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      <div className="ml-3 flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        onClick={() => removeToast(id)}
        className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <FiX className="w-4 h-4" />
      </button>
    </div>
  )
}

