'use client';
import React from 'react';
import styles from '../(style)/(styleComponents)/navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';

//images imports
import logoAlica from '../../../public/images/ALICA.png';
import bandeauCreerAsso from '../../../public/images/BandeauCreerAsso.png';

//MUI imports
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

//FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


export default function Navbar() {

    const [openModalLogin, setOpenModalLogin] = React.useState(false);
    const [openModalSignup, setOpenModalSignup] = React.useState(false);

    const handleOpenLogin = () => setOpenModalLogin(true);
    const handleCloseLogin = () => setOpenModalLogin(false);

    const handleOpenSignup = () => setOpenModalSignup(true);
    const handleCloseSignup = () => setOpenModalSignup(false);

    return (
        <div className={styles.container}>
            <div className={styles.logoAlica}>
                <Image className={styles.logo} src={logoAlica} alt="ALICA" />
            </div>
            <div className={styles.links}>
                <Link className={styles.link} href="/">
                    <p>A propos</p>
                </Link>
                <Link className={styles.link} href="/events">
                    <p>Evenements</p>
                </Link>
                <Link className={styles.link} href="/offers">
                    <p>Offres</p>
                </Link>
                <Link className={styles.link} href="/contact">
                    <p>Nous contacter</p>
                </Link>
                <Link className={styles.link} href="/alumnis">
                    <p>Les Alumnis</p>
                </Link>
            </div>
            <div className={styles.logIn_signUp}>
                <button className={styles.buttonLogin} onClick={handleOpenLogin}>Se connecter</button>
                <Modal
                    open={openModalLogin}
                    onClose={handleCloseLogin}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={styles.modal}>
                        <FontAwesomeIcon className={styles.closeIcon} icon={faXmark} onClick={handleCloseLogin} />
                        <Image className={styles.bandeauCreerAsso} src={bandeauCreerAsso} alt="Bandeau Creer Asso" />
                        <p className={styles.modalTitle}>Se connecter</p>
                        <form className={styles.modalForm}>
                            <div className={styles.inputs}>
                                <TextField 
                                    className={styles.textField}
                                    id="outlined-basic" 
                                    label="Email" 
                                    variant="outlined" 
                                />
                                <TextField 
                                    className={styles.textField}
                                    id="outlined-basic" 
                                    label="Mot de passe" 
                                    variant="outlined" 
                                />
                            </div>
                            <p className={styles.textPassword}>Mot de passe oublié ?</p>
                            <button className={styles.submitButton} type="submit">Se connecter</button>
                        </form>
                    </div>
                </Modal>
                <button className={styles.buttonSignup} onClick={handleOpenSignup}>S'inscrire</button>
                <Modal
                    open={openModalSignup}
                    onClose={handleCloseSignup}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className={styles.modal}>
                        <FontAwesomeIcon className={styles.closeIcon} icon={faXmark} onClick={handleCloseSignup} />
                        <Image className={styles.bandeauCreerAsso} src={bandeauCreerAsso} alt="Bandeau Creer Asso" />
                        <p className={styles.modalTitle}>S'inscrire</p>
                        <form className={styles.modalFormSignup}>
                            <div className={styles.inputsSignup}>
                                <TextField 
                                    className={styles.textField}
                                    id="outlined-basic" 
                                    label="Identifiant" 
                                    variant="outlined"
                                />
                                <TextField 
                                    className={styles.textField}
                                    id="outlined-basic" 
                                    label="Email" 
                                    variant="outlined" 
                                />
                                <TextField 
                                    className={styles.textField}
                                    id="outlined-basic" 
                                    label="Mot de passe" 
                                    variant="outlined" 
                                />
                            </div>
                            <p className={styles.textPassword}>Mot de passe oublié ?</p>
                            <button className={styles.submitButton} type="submit">Se connecter</button>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
}