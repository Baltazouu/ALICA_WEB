'use client';
import React from 'react';
import Image from 'next/image';
import styles from '../(style)/(styleComponents)/contact.module.css';
import bandeauCreerAsso from '../../../public/images/BandeauCreerAsso.png';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ContactProps {
    open: boolean;
    handleClose: () => void;
}

export default function Contact({ open, handleClose }: ContactProps) {

    const [contact, setContact] = React.useState({
        nom: '',
        prenom: '',
        email: '',
        message: ''
    });

    const handleSubmitContact= async (e: any) => {
        e.preventDefault();
        //TODO: send email to alica
    }

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
                <p className={styles.modalTitle}>Contact</p>
                <form className={styles.modalForm} onSubmit={handleSubmitContact}>
                    <div className={styles.inputs}>
                        <TextField
                            className={styles.textField}
                            value={contact.nom}
                            onChange={(e) => setContact({ ...contact, nom: e.target.value })}
                            id="outlined-basic"
                            label="Nom"
                            variant="outlined"
                        />
                        <TextField
                            className={styles.textField}
                            value={contact.prenom}
                            onChange={(e) => setContact({ ...contact, prenom: e.target.value })}
                            id="outlined-basic"
                            label="Prénom"
                            variant="outlined"
                        />
                        <TextField
                            className={styles.textField}
                            value={contact.email}
                            onChange={(e) => setContact({ ...contact, email: e.target.value })}
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                        />
                        <TextField
                            className={styles.textField}
                            value={contact.message}
                            onChange={(e) => setContact({ ...contact, message: e.target.value })}
                            id="outlined-basic"
                            type='text'
                            label="Message"
                            variant="outlined"
                            multiline
                            rows={4}
                        />
                    </div>
                    <button className={styles.submitButton} type="submit">Envoyer</button>
                </form>
            </div>
        </Modal>
    )
}