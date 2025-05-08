import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createTodo as createTodoApi,
  deleteCompleted as deleteCompletedApi,
  deleteTodo as deleteTodoApi,
  getAllTodos,
  updateTodo as updateTodoApi
} from '../apis/todos'
import { toast } from 'react-toastify'

export function useTodos (filter) {
  const { data: todos, isPending: isGettingTodos } = useQuery({
    queryKey: ['todos', filter],
    queryFn: () => getAllTodos(filter)
  })

  return { todos: todos || [], isGettingTodos }
}

export function useCreateTodo () {
  const queryClient = useQueryClient()
  const { mutate: createTodo, isPending: isCreatingTodo } = useMutation({
    mutationFn: createTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Todo created successfully')
    }
  })

  return { createTodo, isCreatingTodo }
}

export function useDeleteTodo () {
  const queryClient = useQueryClient()
  const { mutate: deleteTodo, isPending: isDeletingTodo } = useMutation({
    mutationFn: deleteTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
    onError: () => {
      toast.error('Something went wrong')
    }
  })

  return { deleteTodo, isDeletingTodo }
}

export function useUpdateTodo () {
  const queryClient = useQueryClient()
  const { mutate: updateTodo, isPending: isUpdatingTodo } = useMutation({
    mutationFn: updateTodoApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      toast.success('Todo updated successfully')
    }
  })

  return { updateTodo, isUpdatingTodo }
}

export function useDeleteCompleted () {
  const queryClient = useQueryClient()
  const { mutate: deleteCompleted, isPending: isDeletingCompleted } =
    useMutation({
      mutationFn: deleteCompletedApi,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      }
    })
  return { deleteCompleted, isDeletingCompleted }
}
