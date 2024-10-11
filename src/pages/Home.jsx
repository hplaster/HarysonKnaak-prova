import React from 'react'
import { Container, Button, Table } from 'react-bootstrap'
import { useState, useEffect } from 'react';
import NavBarra from '../components/NavBarra';
import { useNavigate } from 'react-router-dom';

const url = "http://localhost:5000/produtos"

const Home = () => {
    const navigate = useNavigate()

    const [produtos, setProdutos] = useState([]);

    async function atualizarPag() {
        try {
            const res = await fetch(url)
            const products = await res.json()
            setProdutos(products)
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(url)
                const products = await res.json()
                setProdutos(products)
            } catch (error) {
                console.log(error.message)
            }
        }
        fetchData();
    }, []);

    return (
        <div style={{ backgroundColor: "#A1D6B2", minHeight: "100vh" }}>
            <NavBarra />

            <Container style={{marginTop: "20px"}}>
                <h1>Lista de Produtos</h1>
                <div className='d-grid col-2 gap-2'>
                    <Button variant='primary' size='lg' className='mb-3 d-inline-flex justify-content-center' style={{backgroundColor: "green", border: "none"}} onClick={() => navigate('/cadastro')}>
                        <span className='material-symbols-outlined flex' style={{ fontSize: "30px", paddingRight: "8px" }}>add_circle</span>
                        Cadastrar
                    </Button>
                </div>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nome</th>
                            <th>Categoria</th>
                            <th>Preço</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {produtos.map((produto) => (
                            <tr key={produto.id}>
                                <td>{produto.id}</td>
                                <td>{produto.nome}</td>
                                <td>{produto.categoria}</td>
                                <td>{produto.preco}</td>
                                <td>
                                    <Button variant="danger" onClick={async () => {
                                        const res = await fetch(url + `/${produto.id}`, {
                                            method: 'DELETE',
                                            headers: { "Content-Type": "application/json" }
                                        });
                                        const produtoRemovido = await res.json()
                                        alert(`O produto ${produtoRemovido.nome} foi removido com sucesso.`)
                                        atualizarPag();
                                    }}>Excluir</Button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
            </Container>

        </div>
    )
}

export default Home;