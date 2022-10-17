import React, { useEffect, useState } from "react";
import Axios from "axios";
import Header from "../header/indexHeader"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './stylesLista.css';

const Pecas = () => {
    const [data, setDate] = useState();

    useEffect(() => {
        Axios.get('http://127.0.0.1:8000/api/pecas')
        .then(res => {
          console.log("Getting from ::::", res.data)
          setDate(res.data)
        }).catch(err => console.log(err))
    }, []);

    const arr = data?.map((data, index) => {
      return (
      <tr>
        <td>{data.id}</td>
        <td>{data.sku}</td>
        <td>{data.nome}</td>
        <td>{data.is_active}</td>
        <td>#</td>
      </tr>
      )
    })
  
    return (
      <div className="listaPecas">
        <Header/>
        <div className="buttonArea">
          <Button className= "botaoCadastro" variant="primary" href="/cadastro">Cadastrar</Button>{''}
        </div>
        <Table className="tabletest" striped borderless responsive>
          <thead>
            <tr>
              <th><strong>#</strong></th>
              <th>SKU</th>
              <th>Nome</th>
              <th>Status da peça</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {arr}
          </tbody>
        </Table>
      </div>
  );
}

export default Pecas;


