'use client';
import React, { useState } from 'react';
import styles from '../(style)/(styleComponents)/navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

//images imports
import logoAlica from '../../../public/images/ALICA.png';
import bandeauCreerAsso from '../../../public/images/BandeauCreerAsso.png';

//MUI imports
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import { PersonAdd, Settings, Logout } from '@mui/icons-material';
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';

//FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Contact from './contact';
import { Box } from '@mui/material';


export default function Navbar() {

    const session = useSession();
    const router = useRouter();
    const [error, setError] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [isSignUp, setIsSignUp] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [credentials, setCredentials] = React.useState({
        email: '',
        password: ''
    });

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

    const [openModalContact, setOpenModalContact] = useState(false);

    const handleOpenContact = () => {
        setOpenModalContact(true);
    };

    const handleCloseContact = () => {
        setOpenModalContact(false);
    };

    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    const isValidEmail = (email: string) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    }

    const handleSubmitSignIn = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const res = await signIn('credentials', {
            redirect: false,
            email: credentials.email,
            password: credentials.password
        });

        if (res?.error) {
            setLoading(false);
            setError('Identifiant ou mot de passe incorrect');
            if (res?.url) router.replace('/dashboard');
        } else {
            // router.replace('/dashboard');
            setError('');
            setLoading(false);
            handleCloseLogin();
        }
    }

    const handleSubmitSignUp = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        if (!isValidEmail(user.email)) {
            setError('Email invalide');
            return;
        }
        try {
            const res = await fetch('/api/register', {
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
                <Link className={styles.link} href="#events">
                    <p>Evenements</p>
                </Link>
                <Link className={styles.link} href="#offers">
                    <p>Offres</p>
                </Link>
                <Link className={styles.link} href="" onClick={handleOpenContact}>
                    <p>Nous contacter</p>
                </Link>
                <Contact open={openModalContact} handleClose={handleCloseContact} />
                <Link className={styles.link} href="/alumnis">
                    <p>Les Alumnis</p>
                </Link>
            </div>
            <div className={styles.logIn_signUp}>
                {!session.data && <button className={styles.buttonLogin} onClick={handleOpenLogin}>Se connecter</button>}
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
                        <form className={styles.modalForm} onSubmit={handleSubmitSignIn}>
                            <div className={styles.inputs}>
                                <TextField
                                    className={styles.textField}
                                    value={credentials.email}
                                    onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                />
                                <TextField
                                    className={styles.textField}
                                    value={credentials.password}
                                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
                {!session.data && <button className={styles.buttonSignup} onClick={handleOpenSignup}>S'inscrire</button>}
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
                            {loading
                                ? <CircularProgress />
                                : <button className={styles.submitButton} type="submit">S'inscrire</button>
                            }
                            {isSignUp && <p className={styles.success}>Inscription réussie</p>}
                            <p className={styles.error}>{error && error}</p>
                        </form>
                    </div>
                </Modal>
                {session.data &&
                    <Tooltip className={styles.buttonMenu} title="Account settings">
                        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar className={styles.avatar} alt="iconAlumni" src="/images/iconAlumni.png" sx={{ width: 34, height: 34 }} />
                            </IconButton>
                            <p className={styles.buttonProfil} onClick={handleClick}>Mon profil</p>
                        </Box>
                    </Tooltip>
                }
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose}>
                        <Link className={styles.linkProfile} href="/profile">
                            <Avatar className={styles.avatar} alt="iconAlumni" src="/images/iconAlumni.png" sx={{ width: 28, height: 28 }} />
                            <p className={styles.menuProfil}>Mon profile</p>
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link className={styles.linkProfile} href="/profile/myOffers">
                            <PermContactCalendarIcon sx={{ width: 28, height: 28 }} />
                            <p className={styles.menuProfil}>Mes offres</p>
                        </Link>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => signOut()}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Déconnexion
                    </MenuItem>
                </Menu>
            </div>
        </div>
    );
}