import React, { useEffect, useState } from 'react';
import { Card, Container } from '@mui/material'
import { getTodos } from '../api/api';

export const Todos = () => {
    const [todos, setTodos] = useState([])
    useEffect(() => {
        getTodos().then((res) => {
            setTodos(res.data)
        })
    }, [])
    return <Container style={{ padding: 20 }}>
        <div>Todos</div>
        <div style={{ display: 'flex', flexDirection: 'column', margin: '40px', gap: 20 }}>
            {todos.map(i => <Card key={i._id} style={{ width: '300px', display: 'flex', flexDirection: 'column', minHeight: 70, padding: 20 }}>
                <div><b>{i.title}</b></div>
                <div>
                    {i.description}
                </div>
                <div>
                    {`Created: ${new Date(i.createdAt)}`}
                </div>
            </Card>)}
        </div>
    </Container>
}