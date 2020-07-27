import React, { useEffect, useState } from 'react';
import { Link,useHistory } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';
export default function Profile() {
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);

    })

  }, [ongId])

  async function handleDeleteIncident(id){
    try{

      await api.delete(`incidents/${id}`, {
         headers: {
           authorization: ongId,
         }
      });
      setIncidents(incidents.filter(incident => incident.id !== id));
    }catch(err){
      alert('Erro ao tentar deletar, tente novamente.');
    }

  }

  function handleLogout(){
    localStorage.clear();
    history.push('/');

  }

  return (

    <div className="profile-container">
      <header>
        <img src={logo} />
        <span>Bem vinda(o), {ongName}</span>

        <Link to="/incidents/new" className="button">NOVO CASO</Link>
        <button onClick={handleLogout} type="button" data-tooltip="SAIR">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>

        {incidents.map(incident =>(
           <li key={incident.id}>
           <strong>CASO:</strong>
        <p>{incident.title}</p>
 
           <strong>DESCRIÇÂO:</strong>
           <p>{incident.description}</p>
 
           <strong>VALOR:</strong>
        <p>{Intl.NumberFormat('pt-BR', {style:'currency', currency:'BRL'}).format(incident.value) }</p>
 
           <button onClick={() => handleDeleteIncident(incident.id)} type="button"  data-tooltip="Deletar">
             <FiTrash2 size={20}
              color="#a8a8b3" 
             />
           </button>
 
         </li>
        ))}

      </ul>
    </div>
  )
}