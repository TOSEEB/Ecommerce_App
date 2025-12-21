export const retryRequest = async (requestFn, maxRetries = 3, delay = 1000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await requestFn()
    } catch (error) {
      const isLastAttempt = i === maxRetries - 1
      const isTimeout = error.code === 'ECONNABORTED' || error.message?.includes('timeout')
      const isNetworkError = error.code === 'ERR_NETWORK' || error.message?.includes('Failed to fetch')
      
      if (isLastAttempt || (!isTimeout && !isNetworkError)) {
        throw error
      }
      
      const backoffDelay = delay * Math.pow(2, i)
      await new Promise(resolve => setTimeout(resolve, backoffDelay))
    }
  }
}

