import PropTypes from 'prop-types'
import { createContext, useState, useEffect } from 'react'

export const TodoContext = createContext()

export function TodoContextProvider (props) {

  const [store, setStore] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('store')
    return JSON.parse(boardFromLocalStorage) ?? []
  })

  const [sql, setSql] = useState(false)

  useEffect(() => {

    (async () => {
      try {
        const res = await fetch("http://localhost:3000/")
        const data = await res.json()
        setStore(data)
        setSql(true)
      } catch (error) {
        if (error.message === 'Failed to fetch') {
          console.warn('SQL server is only available in offline mode, you will use local storage');
        } else {
          console.warn('Error:', error);
        }
        setSql(false)
      }
    })()
    return () => {

    }
  }, [])

  return (
    <TodoContext.Provider
      value={{
        store,
        setStore,
        sql
      }}>

      {props.children}

    </TodoContext.Provider>
  )
}

TodoContextProvider.propTypes = {
  children: PropTypes.any
}