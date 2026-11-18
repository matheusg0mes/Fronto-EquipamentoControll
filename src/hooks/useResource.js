import { useCallback, useEffect, useState } from 'react'

// Hook genérico de carregamento: { data, loading, error, reload }
export function useResource(fetcher, initial = []) {
  const [data, setData] = useState(initial)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setData(await fetcher())
    } catch (e) {
      setError(e.userMessage ?? e.message)
    } finally {
      setLoading(false)
    }
  }, [fetcher])

  useEffect(() => {
    reload()
  }, [reload])

  return { data, loading, error, reload }
}
