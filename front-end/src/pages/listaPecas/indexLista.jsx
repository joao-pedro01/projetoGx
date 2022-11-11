import React, { useEffect, useState } from "react";
import Axios from "axios";
import Header from "../header/indexHeader"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './stylesLista.css';

import { 
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Link,
} from "react-router-dom";


const Pecas = () => {
    const [data, setDate] = useState();

    useEffect(() => {
        Axios.get('http://172.22.2.22:8080/api/pecas')
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
        <td>{data.is_active} </td>
        <td>{data.saldo}</td>
      </tr>
      )
    })

    return (
      <div className="listaPecas">
        <Header/>
        <div className="buttonArea">
          <Button className= "botaoCadastro" variant="primary" href="/cadastro/pecas">Nova Peça</Button>{''}
        </div>
        <Table className="tabletest" striped borderless responsive>
          <thead>
            <tr>
              <th><strong>#</strong></th>
              <th>SKU</th>
              <th>Nome</th>
              <th>Status</th>
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


