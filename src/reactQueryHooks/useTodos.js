import { useMutation, useQuery } from '@tanstack/react-query'
import {
  createTodo as createTodoApi,
  deleteTodo as deleteTodoApi,
  getAllTodos,
  updateTodo as updateTodoApi
} from '../apis/todos'
import { toast } from 'react-toastify'

export function useTodos () {
  const { data: todos, isPending: isGettingTodos } = useQuery({
    queryKey: ['todos'],
    queryFn: getAllTodos
  })

  return { todos: todos || [], isGettingTodos }
}

export function useCreateTodo () {
  const { mutate: createTodo, isPending: isCreatingTodo } = useMutation({
    mutationFn: createTodoApi
  })

  return { createTodo, isCreatingTodo }
}

export function useDeleteTodo () {
  const { mutate: deleteTodo, isPending: isDeletingTodo } = useMutation({
    mutationFn: deleteTodoApi
  })

  return { deleteTodo, isDeletingTodo }
}

export function useFilterTodo (filter) {
  const { data: todos, isPending: isGettingTodos } = useQuery({
    queryKey: ['todos'],
    queryFn: () => getAllTodos(filter)
  })
  return { todos, isGettingTodos }
}

export function useUpdateTodo () {
  const { mutate: updateTodo, isPending: isUpdatingTodo } = useMutation({
    mutationFn: updateTodoApi,
    onSuccess: () => {
      toast.success('Todo updated successfully')
    }
  })

  return { updateTodo, isUpdatingTodo }
}
