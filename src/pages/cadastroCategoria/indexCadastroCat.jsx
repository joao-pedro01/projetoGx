import React, { useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../cadastroCategoria/stylesCadastroCat.css'

function CadastroCategorias() {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [marca_cat, setMarcaCat] = useState("Marca: ");
  const [modelo_cat, setModeloCat] = useState("Modelo:");
  const [atrib1_cat, setAtrib1Cat] = useState("");
  const [atrib2_cat, setAtrib2Cat] = useState("");
  const [atrib3_cat, setAtrib3Cat] = useState("");
  const [atrib4_cat, setAtrib4Cat] = useState("");
  const [atrib5_cat, setAtrib5Cat] = useState("");
  const [atrib6_cat, setAtrib6Cat] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valores = {
        nome: nome.trim() || null,
        tipo: tipo.trim() || null,
        marca_cat: marca_cat.trim() || null,
        modelo_cat: modelo_cat.trim() || null,
        atrib1_cat: atrib1_cat.trim() || null,
        atrib2_cat: atrib2_cat.trim() || null,
        atrib3_cat: atrib3_cat.trim() || null,
        atrib4_cat: atrib4_cat.trim() || null,
        atrib5_cat: atrib5_cat.trim() || null,
        atrib6_cat: atrib6_cat.trim() || null,
      };
    

    try {
      const response = axios.post("http://172.22.2.22:3030/api/categorias", valores);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border">
      <div className="form-group">
        <label htmlFor="nome">Nome:</label>
        <input
          type="text"
          className="form-control"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tipo">Tipo:</label>
        <input
          type="text"
          className="form-control"
          id="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />
      </div>
      <div className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="ativo"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="ativo">
          Ativo
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="marcaCat">Marca:</label>
        <input
          type="text"
          className="form-control"
          id="marcaCat"
          value={marca_cat}
          onChange={(e) => setMarcaCat(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="modeloCat">Modelo:</label>
        <input
            type="text"
            className="form-control"
            id="modeloCat"
            value={modelo_cat}
            onChange={(e) => setModeloCat(e.target.value)}
            />
        </div>
      <div className="form-group">
        <label htmlFor="atrib1Cat">Atributo 1:</label>
        <input
          type="text"
          className="form-control"
          id="atrib1Cat"
          value={atrib1_cat}
          onChange={(e) => setAtrib1Cat(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="atrib2Cat">Atributo 2:</label>
        <input
            type="text"
            className="form-control"
            id="atrib2Cat"
            value={atrib2_cat}
            onChange={(e) => setAtrib2Cat(e.target.value)}
        />
        </div>
        <div className="form-group">
            <label htmlFor="atrib3Cat">Atributo 3:</label>
            <input
            type="text"
            className="form-control"
            id="atrib3Cat"
            value={atrib3_cat}
            onChange={(e) => setAtrib3Cat(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="atrib4Cat">Atributo 4:</label>
            <input
                type="text"
                className="form-control"
                id="atrib4Cat"
                value={atrib4_cat}
                onChange={(e) => setAtrib4Cat(e.target.value)}
            />
        </div>
        <div className="form-group">
            <label htmlFor="atrib5Cat">Atributo 5:</label>
            <input
                type="text"
                className="form-control"
                id="atrib5Cat"
                value={atrib5_cat}
                onChange={(e) => setAtrib5Cat(e.target.value)}
                />
            </div>
        <div className="form-group">
            <label htmlFor="atrib6Cat">Atributo 6:</label>
            <input
                type="text"
                className="form-control"
                id="atrib6Cat"
                value={atrib6_cat}
                onChange={(e) => setAtrib6Cat(e.target.value)}
                />
            </div>
        <button type="submit" className="btn btn-primary"> Salvar </button>
    </form>
);
}

export default CadastroCategorias;