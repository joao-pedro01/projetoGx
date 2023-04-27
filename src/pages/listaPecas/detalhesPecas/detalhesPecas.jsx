import { useState } from 'react';
import Axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function DetalhesPecas() { 
    const [data, setDate] = useState();
    const { id } = useParams();

    useEffect(() => {
        Axios.get('http://172.22.2.22:3030/api/especificacoes')
        .then(res => {
          console.log("Getting from ::::", res.data)
          setDate(res.data)
        }).catch(err => console.log(err))
    }, [id]);

    if(!data) {
        return <div>api nao carregada</div>;
    }
    
    const arr = data?.map((data, index) => {
        const active = () => {
        }
        return (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.sku}</td>
              <td>{data.nome}</td>
              <td>{data.is_active} </td>
              <td>{data.saldo}</td>
              <td>{data.marca}</td>
              <td>{data.modelo}</td>
          </tr>
        )
      });

    return (
        <div className="container">
            <h1 className="my-4">
                {data.marca}
            </h1>
            <p>
                {arr}
            </p>
        </div>
    );
}
export default DetalhesPecas;