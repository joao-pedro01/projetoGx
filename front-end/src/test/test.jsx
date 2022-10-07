import React, { useEffect, useState } from "react";
import api from "../services/api";
import Axios from "axios";
import Header from "../pages/header/indexHeader"
const Test = () => {
    const [data, setDate] = useState();

    useEffect(() => {
        Axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(res => {
          console.log("Getting from ::::", res.data)
          setDate(res.data)
        }).catch(err => console.log(err))
    }, []);

    const arr = data?.map((data, index) => {
      return (
        <tr>
        <td>{data.id}</td>
        <td>{data.title}</td>
        <td>{data.body}</td>
      </tr>
      )
    })
  
    return (
      <div className="App">
        <Header/>
        <table>
          <tr>
          <th>ID</th>
          <th>TITLE</th>
          <th>BODDY</th>
        </tr>
        {arr}
        </table>
      </div>
  );
}

export default Test;


