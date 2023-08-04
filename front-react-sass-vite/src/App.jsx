import { useContext, useState, useEffect } from 'react'
import { TodoContext } from './context/TodoContextProvider'
import TodoCard from './components/TodoCard'
import { v4 as uuidv4 } from 'uuid';
import './App.scss'
import Form from './components/Form';
import AlertText from './components/AlertText';
import CardLists from './components/CardLists';

function App () {

  const { store, setStore, sql } = useContext(TodoContext)

  const [inputValue, setInputValue] = useState('')
  const [conditionalRendering, setConditionalRendering] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (inputValue.length === 0) {
      return setConditionalRendering(false)
    }

    if (sql) {
      try {
        const res = await fetch(`http://localhost:3000/${inputValue}`, {
          method: "POST",
          timeout: 500
        })
        const data = await res.json()
        const todoNewData = [...store, { title: inputValue, id: data.insertId }] //, id: uuidv4() 
        setStore(todoNewData)

      } catch (error) {
        console.log('>>> SQL is not connected. creating local Storage')
      }
    } else {
      const todoNewData = [...store, { title: inputValue, id: uuidv4() }]
      setStore(todoNewData)
    }
    setConditionalRendering(true)
    setInputValue('')
  }

  const handleChange = (e) => {
    const inputTarget = e.target.value
    setInputValue(inputTarget)
  }

  const handleDelete = async (id) => {
    const todoNewData = store.filter((todo) => {
      return todo.id !== id
    })
    if (sql) {
      try {
        await fetch(`http://localhost:3000/${id}`, {
          method: "DELETE",
          timeout: 500
        })
      } catch (error) {
        console.log('>>> SQL is not connected. deleting IN local Storage')
      }
    }
    setStore(todoNewData)
  }

  useEffect(() => {
    window.localStorage.setItem('store', JSON.stringify(store))
    return () => {
      window.localStorage.clear()
    }
  }, [store])


  return (
    <div className='container'>
      <section className='input-section'>
        <Form handleChange={handleChange} handleSubmit={handleSubmit} inputValue={inputValue} />
        <AlertText conditionalRendering={conditionalRendering} />
      </section>

      <section className='list-section'>
        <CardLists store={store} TodoCard={TodoCard} handleDelete={handleDelete} />
      </section>

    </div>
  )
}

export default App
