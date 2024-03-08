import styles from '../(style)/(styleComponents)/events.module.css';
import React from 'react';

// Import des fonctions de date-fns
import { isValid } from 'date-fns';
import Image from 'next/image';

// Material UI
import Divider from '@mui/material/Divider';

// Import Images
import imageLaserGame from '../../../public/images/laserGame.jpeg';
import iconAlumni from '../../../public/images/iconAlumni.png';

interface Event {
    title: string;
    description: string;
    imageURL: string;
    date: string;
    nbMaxRegistrations: number;
    nbRegistrations: number;
    organizerFirstName: string;
    organizerLastName: string;
    organizerLinkedinURL: string;
    organizerImageURL: string;
}

interface EventsProps {
    eventsList: Event[];
}

export default function Events({ eventsList }: EventsProps) {

    const nbRegistrations = (event: Event) => {
        return event.nbMaxRegistrations - event.nbRegistrations;
    };

    return (
        <div className={styles.content}>
            <div className={styles.events}>
                {eventsList.length === 0 && <h3>Actuellement, il n'y a rien à pourvoir</h3>}
                {eventsList.map((event, index) => (
                    <div key={index} className={styles.event}>
                        <div className={styles.eventImage}>
                            {event.imageURL === 'test_ImageURL'
                                ? (<Image src={imageLaserGame} alt="" className={styles.image} />)
                                : (<img src={event.imageURL} alt="" className={styles.image} />)
                            }
                        </div>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <div className={styles.eventDetails}>
                            <div className={styles.eventOrganizer}>
                                <a href={event.organizerLinkedinURL} target="_blank" rel="noreferrer">
                                    {event.organizerImageURL === null
                                        ? <Image src={iconAlumni} className={styles.organizerImageProfile} alt="" />
                                        : <img src={event.organizerImageURL} className={styles.organizerImageProfile} alt="" />
                                    }
                                </a>
                                <p className={styles.organizerName}>{event.organizerFirstName} {event.organizerLastName}</p>
                            </div>
                            <h3 className={styles.eventTitle}>{event.title}</h3>
                            <p className={styles.eventDescription}>&#10095; {event.description}</p>
                            <p className={styles.eventNbRegistrations}>{nbRegistrations(event)} places restantes</p>
                        </div>
                        <div className={styles.eventDate}>
                            {isValid(new Date(event.date)) && (
                                <>
                                    <p className={styles.dateEEEE}>
                                        {new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long' }).slice(0, 3)}
                                    </p>
                                    <p className={styles.datedd}>
                                        {new Date(event.date).toLocaleDateString('fr-FR', { day: '2-digit' })}
                                    </p>
                                    <p className={styles.dateMMMM}>
                                        {new Date(event.date).toLocaleDateString('fr-FR', { month: 'long' })}
                                    </p>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
