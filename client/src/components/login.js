import { Button, Input } from '@mui/material';
import React, { useState } from 'react';
import { auth } from '../api/api';

export const Login = () => {
    const [login, setLogin] = useState()
    const [password, setPassword] = useState()

    const submit = () => {
        auth(login, password).then(res => {
            if (res.data) {
                localStorage.setItem('user', JSON.stringify(res.data));
                localStorage.setItem('isAuthenticated',true)
                window.location.reload()
            }
        })
    }
    return <div style={{ display: 'flex', flexDirection: 'column', width: '400px', margin: 'auto', marginTop: '200px' }}>
        <Input style={{ color: "white" }} placeholder='login' name='login' onChange={(e) => setLogin(e.target.value)}>
        </Input>
        <Input style={{ color: "white" }} placeholder='password' name='password' onChange={(e) => setPassword(e.target.value)}>
        </Input>
        <Button onClick={submit}>
            Login
        </Button>
    </div>
}