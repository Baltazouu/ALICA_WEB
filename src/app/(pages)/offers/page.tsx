'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Offers from "../../(components)/offers";
import styles from "../../(style)/offers.module.css";
import { useState, useEffect } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "@mui/material";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { TextField, Select, MenuItem, Button } from '@mui/material';

export default function Offer() {
  const [total, setTotal] = useState(0);
  const [last, setLast] = useState(false);
  const [offersList, setOffersList] = useState([]);
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    econtrat: '0',
    job_description: '',
    elevel: '0',
    estudies: '0',
    city: '',
    experience_required: '',
    company: '',
    companyurl: '',
    contact_email: '',
    contact_number: ''
  });

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const session = useSession(); 

  useEffect(() => {
    fetchData();
  }, [page]);

  async function fetchData() {
    try {
      const res = await fetch('/api/offer?page='+page, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setLast(data.last);
        setTotal(data.totalElements);
        setOffersList(data.content);
      }else{
        console.error('Failed to fetch offers:', res.statusText);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  }

  async function postData(e: any) {
    e.preventDefault();

    const requestData = {
      alumniToken: session.data?.user.token,
      alumniId: session.data?.user.id, 
      title: formData.title,
      description: formData.description,
      contract: formData.econtrat === '0' ? 'CDI' : formData.econtrat === '1' ? 'CDD' : formData.econtrat === '2' ? 'Stage' : 'Alternance',
      level: formData.elevel === '0' ? 'JUNIOR' : formData.elevel === '1' ? 'SENIOR' : 'INDIFFERENT',
      city: formData.city,
      company: formData.company,
      jobDescription: formData.job_description,
      studies: formData.estudies === '0' ? 'BAC_2' : formData.estudies === '1' ? 'BAC_3' : formData.estudies === '2' ? 'BAC_5' : 'INDIFFERENT',
      contactEmail: formData.contact_email,
      image: "", 
      experienceRequired: formData.experience_required,
      contactNumber: formData.contact_number,
      companyURL: formData.companyurl
    };

    try {
        const res = await fetch('/api/offer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });
        if (res.status === 200) {
            console.log('Offer posted successfully');
        }else{
            console.error('Failed to post an offer:', res.statusText);
        }
    } catch (error) {
        console.error('An error occurred', error);
    }
  }
  
  return (
    <div className={styles.offers}>
      <div className={styles.add}>
        <a onClick={() => setIsModalOpen(true)}>
          <FontAwesomeIcon icon={faPlus} className={styles.button}/> 
          &ensp;Ajouter une offre
        </a>
      </div>
      <Offers offersList={offersList}/>
      <div className={styles.pagination}>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Precedente</button>
        <span>{page + 1} / {Math.ceil(total / 10)}</span>
        <button onClick={() => setPage(page + 1)} disabled={last}>Suivante</button>
      </div>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <div className={styles.modal}>
          <FontAwesomeIcon className={styles.closeIcon} icon={faXmark} onClick={()=>setIsModalOpen(false)} />
          <p className={styles.titleModalAddOffer}>Ajouter une offre</p>
          <form onSubmit={postData} className={styles.form}>
            <div className={styles.inputs}>
              <TextField id="title" name="title" label="Titre" value={formData.title} onChange={handleChange} />
              <Select label="Type de contrat" id="econtrat" name="econtrat" value={formData.econtrat} onChange={handleChange}>
                <MenuItem value="0">CDI</MenuItem>
                <MenuItem value="1">CDD</MenuItem>
                <MenuItem value="2">Stage</MenuItem>
                <MenuItem value="3">Alternance</MenuItem>
              </Select>
              <TextField
                className={styles.textField}
                multiline
                rows={4}
                label="Description"
                value={formData.description}
                onChange={handleChange}
              />
              <TextField
                className={styles.textField}
                multiline
                label="Description du poste"
                rows={4}
                value={formData.job_description}
                onChange={handleChange}
              />
              <Select id="elevel" name="elevel" value={formData.elevel} label="Niveau" onChange={handleChange}>
                <MenuItem value="0">Junior</MenuItem>
                <MenuItem value="1">Senior</MenuItem>
                <MenuItem value="2">Indifferent</MenuItem>
              </Select>
              <Select id="estudies" name="estudies" label="Niveau d'études" value={formData.estudies} onChange={handleChange}>
                <MenuItem value="0">Bac+2</MenuItem>
                <MenuItem value="1">Bac+3</MenuItem>
                <MenuItem value="2">Bac+5</MenuItem>
                <MenuItem value="3">Indifferent</MenuItem>
              </Select>
              <TextField className={styles.textField} value={formData.city} onChange={handleChange} label="Ville"/>
              <TextField
                className={styles.textField}
                multiline
                label="Expérience requise"
                rows={4}
                value={formData.experience_required}
                onChange={handleChange}
              />
              <TextField className={styles.textField} value={formData.company} onChange={handleChange} label="Entreprise"/>
              <TextField className={styles.textField} value={formData.companyurl} onChange={handleChange} label="Site de l'entreprise"/>
              <TextField className={styles.textField} value={formData.contact_email} onChange={handleChange} label="Email de contact"/>
              <TextField
                className={styles.textField}
                value={formData.contact_number}
                onChange={handleChange}
                label="Numéro de contact"
              />
            </div>
            <button type="submit" className={styles.submitButton}>Ajouter</button>
          </form>
        </div>
      </Modal>
    </div>
  );
}
