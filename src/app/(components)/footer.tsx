'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../(style)/(styleComponents)/footer.module.css';

//images imports
import logoAlica from '../../../public/images/ALICA.png';

//FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook, faSquareInstagram, faSquareXTwitter, faSquareGithub } from '@fortawesome/free-brands-svg-icons';
import Contact from "./contact";

export default function Footer() {

    const [openModalContact, setOpenModalContact] = useState(false);

    const handleOpenContact = () => {
        setOpenModalContact(true);
    };

    const handleCloseContact = () => {
        setOpenModalContact(false);
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.topFooter}>
                <div className={styles.logoDescriptionReseaux}>
                    <Image className={styles.logo} src={logoAlica} alt="ALICA" />
                    <p className={styles.titleALICA}>Réseau d’étudiants et d’anciens étudiants du département Informatique à Aubière.</p>
                    <div className={styles.reseaux}>
                        <FontAwesomeIcon className={styles.iconReseaux} icon={faSquareFacebook} />
                        <FontAwesomeIcon className={styles.iconReseaux} icon={faSquareInstagram} />
                        <FontAwesomeIcon className={styles.iconReseaux} icon={faSquareXTwitter} />
                        <FontAwesomeIcon className={styles.iconReseaux} icon={faSquareGithub} />  {/* avoir si on laisse */}
                    </div>
                </div>
                <div className={styles.association}>
                    <h3 className={styles.title}>Association</h3>
                    <Link href="#articles">
                        <p>A propos</p>
                    </Link>
                    <Link href="#events">
                        <p>Evenements</p>
                    </Link>
                    <Link href="#offers">
                        <p>Offres</p>
                    </Link>
                </div>
                <div className={styles.aide}>
                    <h3 className={styles.title}>Aide</h3>
                    <Link href="" onClick={handleOpenContact}>
                        <p>Nous contacter</p>
                    </Link>
                    <Contact open={openModalContact} handleClose={handleCloseContact} />
                    <Link href="/termeConditions">
                        <p>Termes & Conditions</p>
                    </Link>
                    <Link href="/confidentialite">
                        <p>Politique de confidentialité</p>
                    </Link>
                </div>
            </div>
            <div className={styles.bottomFooter}>
                <p>© Copyrights 2024 - All Rights Reserved by ALICA</p>
            </div>
        </footer>
    )
}