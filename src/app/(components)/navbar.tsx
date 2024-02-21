'use client';
import React from 'react';
import styles from '../(style)/(styleComponents)/navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from "next/navigation";

//images imports
import logoAlica from '../../../public/images/ALICA.png';
import bandeauCreerAsso from '../../../public/images/BandeauCreerAsso.png';

//MUI imports
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

//FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';


export default function Navbar() {

    const router = useRouter();
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [isSignUp, setIsSignUp] = React.useState(false);

    const [user, setUser] = React.useState({
        lastName: '',
        firstName: '',
        email: '',
        password: ''
    });

    const [openModalLogin, setOpenModalLogin] = React.useState(false);
    const [openModalSignup, setOpenModalSignup] = React.useState(false);

    const handleOpenLogin = () => setOpenModalLogin(true);
    const handleCloseLogin = () => setOpenModalLogin(false);

    const handleOpenSignup = () => setOpenModalSignup(true);
    const handleCloseSignup = () => setOpenModalSignup(false);

    const handleChangeUSer = (e: any, prop: string) => {
        setUser({ ...user, [prop]: e.target.value });
    }

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    const handleSubmitSignUp = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        if (!isValidEmail(user.email)) {
            setError('Email invalide');
            return;
        }
        try {
            const res = await fetch('/server/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    lastName: user.lastName,
                    firstName: user.firstName,
                    email: user.email,
                    password: user.password
                 })
            });
            await timeout(2000);
            if (res.status === 200) {
                setIsSignUp(true);
                setError('');
                await timeout(1500);
                setUser({
                    lastName: '',
                    firstName: '',
                    email: '',
                    password: ''
                });
                handleCloseSignup();
                handleOpenLogin();
            }
        } catch (error) {
            setLoading(false);
            setError('Erreur lors de la connexion');
        } finally {
            setLoading(false);
        }
    }

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
                                    type='password'
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
                        <form className={styles.modalFormSignup} onSubmit={handleSubmitSignUp}>
                            <div className={styles.inputsSignup}>
                                <TextField
                                    className={styles.textField}
                                    value={user.lastName}
                                    onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                                    id="outlined-basic"
                                    label="Surname"
                                    variant="outlined"
                                />
                                <TextField
                                    className={styles.textField}
                                    value={user.firstName}
                                    onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                />
                                <TextField
                                    className={styles.textField}
                                    value={user.email}
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                />
                                <TextField
                                    className={styles.textField}
                                    value={user.password}
                                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                                    id="outlined-basic"
                                    type='password'
                                    label="Mot de passe"
                                    variant="outlined"
                                />
                            </div>
                            <p className={styles.textPassword}>Mot de passe oublié ?</p>
                            {loading
                                ? <CircularProgress />
                                : <button className={styles.submitButton} type="submit">S'inscrire</button>
                            }
                            {isSignUp && <p className={styles.success}>Inscription réussie</p>}
                            <p className={styles.error}>{error && error}</p>
                        </form>
                    </div>
                </Modal>
            </div>
        </div>
    );
}