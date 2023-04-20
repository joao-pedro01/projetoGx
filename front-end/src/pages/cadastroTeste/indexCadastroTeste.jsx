import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Axios from "axios";
import HeaderPMS from '../header/indexHeader'
import Button from 'react-bootstrap/Button'

function CadastroTeste(props) {
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);
  const [subForms, setSubForms] = useState([]);
  const [mostrarValue, setMostrarValue] = useState(false);

  useEffect(() => {
    async function fetchOptions() {
      try {
        const response = await Axios.get("http://172.22.2.22:3030/api/categorias");
        setOptions(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchOptions();
  }, []);

  useEffect (() => { 
    if(selectedValue) {
      setMostrarValue(true);
    }
  }, [selectedValue]);


  async function handleOptionChange(event) {
    const optionId = event.target.value;
    setSelectedValue(optionId);
    try {
      const response = await Axios.get(`http://172.22.2.22:3030/api/categorias`);
      setSubForms(response.data);
    } catch (error) {
      console.error(error);
    }
  }

function renderSubForms() {

  const subFormsById = subForms.filter(subForm => String(subForm.id) === String(selectedValue));
  if (selectedValue && selectedValue !== "" || mostrarValue) { 
    return (
      <div>
        {mostrarValue && (
          <div>
            <Form.Label>Insira a quantidade:</Form.Label>
            <Form.Control type="number" id="saldo" name="saldo"/>
          </div>
        )}
        {selectedValue && selectedValue !== "" && (
          <div>
            {subFormsById.map(subForm => (
              <div key={subForm.id}>
                {Object.keys(subForm).filter(key => key.endsWith('_cat') ).map(catKey => (
                  <div key={catKey}>
                    <Form.Label>{subForm[catKey]}</Form.Label>
                    <Form.Control type="text" name={catKey} id={catKey} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
  return 0;
}


  const handleSubmit = async(e) => {
    e.preventDefault();
    const subFormsById = subForms.filter(subForm => String(subForm.id) === String(selectedValue));
    const fk_categorias_id = parseInt(selectedValue);
    const formData = new FormData(e.target);
    const saldo = parseInt(formData.get('saldo'));
    const formDataJson = {};

    console.log(subFormsById)

    subFormsById.map(subForm => { // mapeia o subforms 
      Object.keys(subForm).forEach(key => { //transforma em array e verifica os elementos
        if (key.endsWith("_cat")) {  //se terminar em _cat
          const value = e.target.elements[key].value;
          const newKey = key.replace("_cat", ""); // remove o _cat da chave
          formData.append(newKey, value); // adiciona o novo nome da chave e o valor no formData
          formData.delete(key, value);
        }
      });      
    });

    console.log('Quantidade :', saldo);
    
    for (let [key, value] of formData.entries()) {
      formDataJson[key] = value;
    }
    formDataJson.fk_categorias_id = fk_categorias_id;
    console.log(formDataJson);
    try {
      const response = await Axios.post("http://172.22.2.22:3030/api/especificacoes", formDataJson);
      console.log(response.data);
      alert("Peça cadastrada com sucesso");
    } catch (error) {
      console.error(error);
    }
  };

  return (
  <div className='header'>
    <HeaderPMS/> 
      <div className='container'>
        <div className='boxCAD'>
          <div className='atributos'>
            <h3><b>Cadastro de Peças</b></h3>   
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="exampleForm.ControlSelect1">
                  <Form.Label>Selecione qual peça deseja adicionar:</Form.Label>
                    <Form.Control as="select" value={selectedValue} onChange={handleOptionChange}>
                      <option value="">Selecione...</option>
                        {options.map((option) => (
                        <option key={option.id} value={option.id}>
                        {option.nome}
                      </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  {selectedValue && (
                   <>
                    {subForms.length > 0 ? (
                    renderSubForms()
                    ) : (
                    <p>Erro form</p>
                    )}
                   </>
                  )}
                  <span className="button-cadastrar"><Button type="submit" className="mt-3" variant="success">Cadastrar</Button></span>
                </Form>
              </div>
            </div>
         </div>
        </div>
  );
}


export default CadastroTeste;