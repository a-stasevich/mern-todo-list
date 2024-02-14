import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5555/',
    timeout: 1000,
});

export const getTodos = () => {
    return axiosInstance.get('todos/')
}

export const auth = (login, password) => {
    return axiosInstance.post('auth/', { login, password })
}

export const createTodo = (title, description, createdBy) => {
    return axiosInstance.post('todos/', { title, description, createdBy })
}

export const updateTodo = (title, description, id) => {
    return axiosInstance.put(`todos/${id}`, { title, description })
}


export const deleteTodo = (id) => {
    return axiosInstance.delete(`todos/${id}`)
}


export const getMyTodos = (id) => {
    return axiosInstance.post('todos/my-todos', { id })
}