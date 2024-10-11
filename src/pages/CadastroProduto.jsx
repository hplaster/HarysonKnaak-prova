import React from 'react'
import NavBarra from '../components/NavBarra';
import { Container } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const url = "http://localhost:5000/produtos"

const CadastroProduto = () => {
  const navigate = useNavigate()

  //VARIÁVEIS
  const [nome, setNome] = useState();
  const [categoria, setCategoria] = useState();
  const [preco, setPreco] = useState();
  
  //VARIÁVEIS PARA O ALERTA 
  const [alertaClass, setAlertaClass] = useState("mb-3 d-none");
  const [alertaMensagem, setAlertaMensagem] = useState();
  
  const handleSubmit = async (e) => {
      e.preventDefault()
      
      if (!nome == '') {
          if (!categoria == '') {
              if (!preco == '') {
                const product = {nome, categoria, preco}
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(product)
                })
                alert(`Produto ${product.nome} cadastrado com sucesso`)
                setNome("")
                setCategoria("")
                setPreco("")
                navigate("/home")
              } else {
                  setAlertaClass("mb-3")
                  setAlertaMensagem("O campo Preço não pode ser vazio")
              }
          } else {
              setAlertaClass("mb-3")
              setAlertaMensagem("O campo Categoria não pode ser vazio")
          }
      } else {
          setAlertaClass("mb-3")
          setAlertaMensagem("O campo Nome não pode ser vazio")
      }
  }

  return (
    <div style={{backgroundColor: "#A1D6B2", minHeight: "100vh"}}>
        <NavBarra/>
        <Container style={{display: 'flex', flexDirection: "column", justifyContent: "center", height: "80vh"}}>
          <span class="material-symbols-outlined" style={{ fontSize: "100px", marginBottom: "20px" }}>add_shopping_cart</span>
          <form onSubmit={handleSubmit}>
            {/* Caixinha do Nome */}
            <FloatingLabel controlId="floatingInputName" label="Nome" className="mb-3">
                <Form.Control type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => { setNome(e.target.value) }} />
            </FloatingLabel>

            {/* Caixinha da Categoria */}
            <FloatingLabel controlId="floatingInputCategoria" label="Categoria" className="mb-3">
                <Form.Control type="text" placeholder="Eletrônicos" value={categoria} onChange={(e) => { setCategoria(e.target.value) }} />
            </FloatingLabel>

            {/* Caixinha de Preço */}
            <FloatingLabel controlId="floatingPreco" label="Preço" className="mb-3">
                <Form.Control type="text" placeholder="10.99" value={preco} onChange={(e) => { setPreco(e.target.value) }} />
            </FloatingLabel>
            
            <Alert key="danger" variant="danger" className={alertaClass}>{alertaMensagem}</Alert>
            <Button type='submit' variant="primary" style={{backgroundColor: "green", border: "none"}}>Cadastrar Produto</Button>
          </form>
        </Container>

    </div>
  )
}

export default CadastroProduto;