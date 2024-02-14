import { Button, Card, Input } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { createTodo, deleteTodo, getMyTodos, updateTodo } from '../api/api';

export const User = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [todos, setTodos] = useState([]);
    const [editableTodo, setEditableTodo] = useState()
    const [updateTitle, setUpdateTitle] = useState()
    const [updateDescription, setUpdateDescription] = useState()

    useEffect(() => {
        getMyTodos(user._id).then(
            (res) => {
                setTodos(res.data)
            })
    }, [user._id])

    const saveTodo = useCallback(() => {
        createTodo(title, description, user._id).then((res) => {
            window.location.reload()
        })
    }, [title, description,user._id])


    const updateTodoCallback = useCallback((id) => {
        updateTodo(updateTitle, updateDescription, id).then((res) => {
            getMyTodos(user._id).then(
                (res) => {
                    setTodos(res.data)
                })
            setEditableTodo(null)
        })
    }, [updateTitle, updateDescription,user._id])


    const onSetEditableTodoCallback = useCallback((title, description, id) => {
        setUpdateTitle(title)
        setUpdateDescription(description)
        setEditableTodo(id)
    }, [ setUpdateTitle, setUpdateDescription, setEditableTodo])


    const onDeleteTodoCallback = useCallback((id) => {
        deleteTodo(id).then((res) => {
            getMyTodos(user._id).then(
                (res) => {
                    setTodos(res.data)
                })
            setEditableTodo(null)
        })
    }, [setEditableTodo,user._id])


    return <div style={{ display: 'flex' }}>
        <Card style={{ display: 'flex', flexDirection: 'column', width: 300, padding: 20, margin: '40px', height: 180 }}>
            <div>
                Create TODO
            </div>
            <Input onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
            <Input onChange={(e) => setDescription(e.target.value)} placeholder='Description' />
            <Button onClick={saveTodo}>Save</Button>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', margin: '40px', gap: 20 }}>
            {todos.map(i => <Card key={i._id} style={{ width: '300px', display: 'flex', flexDirection: 'column', minHeight: 70, padding: 20 }} onClick={() => onSetEditableTodoCallback(i.title, i.description, i._id)}>
                {i._id === editableTodo ? <>
                    <Input placeholder='Title' value={updateTitle} onChange={(e) => setUpdateTitle(e.target.value)} />
                    <Input placeholder='Description' value={updateDescription} onChange={(e) => setUpdateDescription(e.target.value)} />
                    <div>
                        <Button onClick={() => updateTodoCallback(i._id)}>Save</Button>
                        <Button onClick={() => onDeleteTodoCallback(i._id)}>Delete</Button>
                        <Button onClick={(e) => {
                            e.stopPropagation()
                            setEditableTodo(null)
                        }}>Cancel</Button>

                    </div>
                </> :
                    <>
                        <div><b>{i.title}</b></div>
                        <div>
                            {i.description}
                        </div>
                        <div>
                            {`Created: ${new Date(i.createdAt)}`}
                        </div>
                    </>
                }
            </Card>)}
        </div>
    </div>
}
