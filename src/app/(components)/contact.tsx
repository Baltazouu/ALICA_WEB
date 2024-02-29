import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import styles from '../(style)/(styleComponents)/contact.module.css';
import Image from 'next/image';
import bandeauCreerAsso from '../../../public/images/BandeauCreerAsso.png';

interface ContactProps {
    open: boolean;
    handleClose: () => void;
}

export default function Contact({ open, handleClose }: ContactProps) {
    const [contact, setContact] = useState({
        nom: '',
        prenom: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmitContact= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('Name', contact.nom+" "+contact.prenom);
            formData.append('Email', contact.email);
            formData.append('Message', contact.message);
            const res = await fetch('https://formspree.io/f/mzbngyak', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (res.ok) {
                setSubmitted(true);
                    setTimeout(() => {
                        setSubmitted(false);
                        handleClose();
                    }, 4000);
            } else {
                console.error('Failed to submit form:', res.statusText);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={styles.modal}>
                <FontAwesomeIcon className={styles.closeIcon} icon={faXmark} onClick={handleClose} />
                <Image className={styles.bandeauCreerAsso} src={bandeauCreerAsso} alt="Bandeau Creer Asso" />
                <p className={styles.modalTitle}>Nous contacter</p>
                {submitted ? ( 
                    <div className={styles.submitted}>
                        <FontAwesomeIcon className={styles.checkIcon} icon={faCheck} />
                        <p>Votre message a été envoyé avec succès !</p>
                    </div>
                ) : (
                <form className={styles.modalForm} onSubmit={handleSubmitContact}>
                    <div className={styles.inputs}>
                        <TextField
                            className={styles.textField}
                            value={contact.nom}
                            onChange={(e) => setContact({ ...contact, nom: e.target.value })}
                            id="outlined-basic"
                            label="Nom"
                            variant="outlined"
                            required={true}
                        />
                        <TextField
                            className={styles.textField}
                            value={contact.prenom}
                            onChange={(e) => setContact({ ...contact, prenom: e.target.value })}
                            id="outlined-basic"
                            label="Prénom"
                            variant="outlined"
                            required={true}
                        />
                        <TextField
                            className={styles.textField}
                            value={contact.email}
                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            required={true}
                        />
                        <TextField
                            className={styles.textField}
                            value={contact.message}
                            onChange={(e) => setContact({ ...contact, message: e.target.value })}
                            id="outlined-basic"
                            type='text'
                            label="Message"
                            variant="outlined"
                            required={true}
                            multiline
                            rows={4}
                        />
                    </div>
                    <button className={styles.submitButton} type="submit">Envoyer</button>
                </form>
                )}
            </div>
        </Modal>
    )
}