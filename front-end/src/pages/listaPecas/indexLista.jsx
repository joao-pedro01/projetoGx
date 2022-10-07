import React, { useEffect, useState } from "react";
import Axios from "axios";
import Header from "../header/indexHeader"
import Table from 'react-bootstrap/Table';

const Pecas = () => {
    const [data, setDate] = useState();

    useEffect(() => {
        Axios.get('http://172.22.1.11:8080/api/pecas')
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
        <td><select>
            <option name="lista">Todos</option>
            <option name="lista">{data.is_active}</option>
            <option name="lista">{data.is_active}</option>
          </select></td>
      </tr>
      )
    })
  
    return (
      <div className="listaPecas">
        <Header/>
        <Table className="tabletest" striped borderless responsive>
          <thead>
            <tr>
              <th>#</th>
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


