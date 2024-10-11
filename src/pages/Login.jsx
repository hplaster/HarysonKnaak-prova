import React from 'react'
import { Container, Nav } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const url = "http://localhost:5000/usuarios"

const Login = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();
    const [usuarios, setUsuarios] = useState([]);

    //VARIÁVEIS PARA O ALERTA 
    const [alertaClass, setAlertaClass] = useState("mb-3 d-none");
    const [alertaMensagem, setAlertaMensagem] = useState();
    const [alertaVariant, setAlertaVariant] = useState("danger");

    const gravarLocalStorage = (usuario) => {
        localStorage.setItem("userEmail", usuario.nome);
        localStorage.setItem("userNome", usuario.email);
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email == '') {
            if (!senha == '') {
                let logado = false
                usuarios.map(usuario => {
                    if (usuario.email == email && usuario.senha == senha) {
                        logado = true
                        gravarLocalStorage(usuario)
                        setAlertaClass("mb-3")
                        setAlertaMensagem("Login efetuado com sucesso")
                        setAlertaVariant("success")
                    }
                })
                if (logado) {
                    navigate('/home')
                } else {
                    setAlertaClass("mb-3")
                    setAlertaMensagem("Email ou Senha incorretos")
                }
            } else {
                setAlertaClass("mb-3")
                setAlertaMensagem("O campo Senha não pode ser vazio")
            }
        } else {
            setAlertaClass("mb-3")
            setAlertaMensagem("O campo Email não pode ser vazio")
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(url)
                const users = await res.json()
                setUsuarios(users)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData();
    }, []);

    return (
        <Container style={{ display: 'flex', flexDirection: "column", justifyContent: "center", height: "80vh" }}>
            <span class="material-symbols-outlined" style={{ fontSize: "100px" }}>login</span>
            <form onSubmit={handleLogin}>
                {/* Caixinha do Email */}
                <FloatingLabel controlId="floatingInputEmail" label="Email" className="mb-3">
                    <Form.Control type="text" placeholder="name@example.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </FloatingLabel>

                {/* Caixinha da Senha */}
                <FloatingLabel controlId="floatingPassword" label="Senha" className="mb-3">
                    <Form.Control type="password" placeholder="Password" value={senha} onChange={(e) => { setSenha(e.target.value) }} />
                </FloatingLabel>

                <Alert key="danger" variant={alertaVariant} className={alertaClass}>{alertaMensagem}</Alert>
                <Button variant="primary" type='submit' style={{backgroundColor: "green", border: "none"}}>Entrar</Button>
            </form>
            {/* <p style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>Não tem Cadastro?<Nav.Link href='/cadastro'>Cadastrar-se</Nav.Link></p> */}
        </Container>
    )
}

export default Login;