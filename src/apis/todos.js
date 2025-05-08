import { toast } from 'react-toastify'
import { API_BASE_URL } from '../constants'

export async function getAllTodos (filter) {
  //   const params = new URLSearchParams()

  //   if (filter) {
  //     params.append('filter', filter)
  //   }
  let res

  try {
    if (filter) {
      res = await fetch(`${API_BASE_URL}?filter=${filter}`)
    } else {
      res = await fetch(`${API_BASE_URL}`)
    }
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
    toast.error('Something went wrong')
  }
}

export async function createTodo (newTodo) {
  try {
    const res = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTodo)
    })
    await res.json()
  } catch (err) {
    console.log(err)
    toast.error('Something went wrong')
  }
}

export async function deleteTodo (id) {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE'
    })
    await res.json()
  } catch (err) {
    console.log(err)
    toast.error('Something went wrong')
  }
}

export async function updateTodo ({ id, updatedTodo }) {
  try {
    const res = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedTodo)
    })

    await res.json()
  } catch (err) {
    console.log(err)
    toast.error('Something went wrong')
  }
}

export async function deleteCompleted () {
  try {
    const res = await fetch(`${API_BASE_URL}`, {
      method: 'DELETE'
    })
    const data = await res.json()
    return data
  } catch (err) {
    console.log(err)
    toast.error('Something went wrong')
  }
}
