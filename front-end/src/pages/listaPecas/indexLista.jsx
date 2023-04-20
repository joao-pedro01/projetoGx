import React, { useEffect, useState } from "react";
import Axios from "axios";
import Header from "../header/indexHeader"
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './stylesLista.css';
import { useNavigate } from 'react-router-dom'; 

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
        Axios.get('http://172.22.2.22:3030/api/especificacoes')
        .then(res => {
          console.log("Getting from ::::", res.data)
          setDate(res.data)
        }).catch(err => console.log(err))
    }, []);

    function handleRedirect(id) {
      window.location.href = `/pecas/${id}`;
    }

    const arr = data?.map((data, index) => {
      const active = () => {
      }
      return (
          <tr key={data.id} onClick={() => handleRedirect(data.id)}>
            <td>{data.id}</td>
            <td>{data.SKU}</td>
            <td>{data.nome}</td>
            <td>{data.is_active} </td>
            <td>{data.saldo}</td>
            <td>{data.marca}</td>
            <td>{data.modelo}</td>
        </tr>
      )
    });

    return (
      <div className="listaPecas">
        <Header/>
        <div className="buttonArea">
          <Button className= "botaoCadastro" variant="primary" href="/teste">Nova Peça</Button>{''}
        </div>
        <Table className="tabletest hoverable" striped borderless responsive>
          <thead>
            <tr>
              <th><strong>#</strong></th>
              <th>SKU</th>
              <th>Nome</th>
              <th>Status</th>
              <th>Quantidade</th>
              <th>Marca</th>
              <th>Modelo</th>
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