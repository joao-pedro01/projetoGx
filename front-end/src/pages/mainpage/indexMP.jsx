import React from "react";
import Table from 'react-bootstrap/Table'; //import estilização tabela boostrap
import './stylesMP.css'

const MainPage = () => {
    return (
<Table className="tabletest" striped borderless responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Descrição<output></output></th>
          <th>Local</th>
          <th>Quantidade</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>kazu </td>
          <td>xxx</td>
          <td>prefeitura</td>
          <td>2</td>
        </tr>
        <tr>
          <td>2</td>
          <td>mateus careca</td>
          <td>xxx</td>
          <td>prefeitura</td>
          <td>2</td>
        </tr>
        <tr>
          <td>3</td>
          <td>jota pe</td>
          <td>xxx</td>
          <td>prefeitura</td>
          <td>1</td>
        </tr>
      </tbody>
    </Table>
    );
}
export default MainPage;

