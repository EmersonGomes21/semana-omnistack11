import React, {useState} from 'react';
import './styles.css';
import logo from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();
  async function handleNewincident(e){
    e.preventDefault();
    const data = {
      title,
      description,
      value,

    };

    if (title == ''){
      alert('Título é obrigatório!')
    }
     else if (description == ''){
      alert('Descrição é obrigatória!')
    }
    else if (value  == ''){
      alert('Valor da ajuda é obrigatório!')
    }else{
    try{
    await api.post('incidents', data,{
      headers:{
        authorization: ongId
      }
    })
    alert(`Caso ${title} adicionado com sucesso!`)

    }catch(err){
      alert(`Erro ao cadastrar o caso ${title}, tente novamente.`);
    }
  }
  }


  return (


    <div className="new-incident-container">
      <div className="content">

        <section>
          <img src={logo} alt="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói que resolva o mesmo.</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
         Retornar 
       </Link>
        </section>

        <form onSubmit={handleNewincident}>
          <input
           placeholder="Título do caso"
           value={title}
           onChange={ e => setTitle(e.target.value)}
           />

          <textarea 
          placeholder="Descrição"
          value={description}
           onChange={ e => setDescription(e.target.value)}
          
          />

          <input type="number"
          placeholder="Valor em R$" 
          value={value}
           onChange={ e => setValue(e.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>

        </form>

      </div>
    </div>
  )
}