import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  useEffect(() => {
    api.get('/profile', {
      headers: {
        Authorization: ongId,
      },
    })
      .then(({ data }) => {
        setIncidents(data);
      })
      .catch(err => console.error(err.message));
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          'Authorization': ongId,
        },
      });

      setIncidents(incidents.filter((incident) => incident.id !== id));
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.');
    }
  }

  function handleLogout() {
    localStorage.clear();
    
    history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Heroe" />
        <span>Bem-vinda, {ongName}</span>

        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidents.map(({ id, title, description, value }) => (
          <li key={id}>
            <strong>CASO:</strong>
            <p>{title}</p>

            <strong>Descrição:</strong>
            <p>{description}</p>

            <strong>Valor:</strong>
            <p>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(value)}
            </p>

            <button onClick={() => handleDeleteIncident(id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
