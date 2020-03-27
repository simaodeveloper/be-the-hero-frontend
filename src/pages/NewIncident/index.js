import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import './style.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  async function newIncidentHandler(e) {
    e.preventDefault();

    const ongId = localStorage.getItem('ongId');

    const data = {
      title,
      description,
      value
    };

    try {
      await api.post('incidents', data, {
        headers: {
          Authorization: ongId
        }
      });

      history.push('/profile');
    } catch (error) {
      alert('Dados incorrentos, favor verificar!');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver isso.
          </p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={14} color="#E02041" />
            Voltar para a Home
          </Link>
        </section>
        <form onSubmit={newIncidentHandler}>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Título do caso" />
          <textarea
            name=""
            id=""
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descrição">
          </textarea>
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="valor em reais" />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
