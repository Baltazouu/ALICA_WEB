import styles from '../(style)/(styleComponents)/events.module.css';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

// Import des fonctions de date-fns
import { isValid } from 'date-fns';
import Image from 'next/image';

// Material UI
import Divider from '@mui/material/Divider';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

// Import Images
import imageLaserGame from '../../../public/images/laserGame.jpeg';
import iconAlumni from '../../../public/images/iconAlumni.png';

interface Event {
    id: number;
    title: string;
    description: string;
    imageId: string;
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
    alumniToken: string;
}

export default function Events({ eventsList, alumniToken }: EventsProps) {
    const session = useSession();
    const [subscribedEvents, setSubscribedEvents] = useState<number[]>([]);

    const [openModalInfoEvent, setOpenModalInfoEvent] = useState<number>();
    const handleCloseModalInfoEvent = () => setOpenModalInfoEvent(undefined);

    useEffect(() => {
        const fetchSubscribedEvents = async () => {
            try {
                const res = await fetch('/api/subEvent?alumniId=' + session.data?.user.id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': session.data?.user.token
                    }
                });
                if (res.status === 200) {
                    const data = await res.json();
                    setSubscribedEvents(data);
                }
            } catch (err: any) {
                console.error('Subscribe error : ' + err);
            }
        };

        fetchSubscribedEvents();
    }, [session.data?.user.id, session.data?.user.token]);

    const handleSubscribe = async (eventId: number, subscribe: boolean) => {
        try {
            const res = await fetch(`/api/${subscribe ? 'sub' : 'unSub'}Event?eventId=${eventId}`, {
                method: 'PUT',
                cache: 'no-cache',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': alumniToken
                }
            });
            if (res.status === 200) {
                const data = await res.json();
                setSubscribedEvents(subscribe ? [...subscribedEvents, eventId] : subscribedEvents.filter(id => id !== eventId));
                window.location.reload();
            }
        } catch (err: any) {
            console.error('Subscription error: ' + err);
        }
    };

    const nbRegistrations = (event: Event) => event.nbMaxRegistrations - event.nbRegistrations;

    const isSubscribed = (eventId: number) => subscribedEvents.includes(eventId);

    return (
        <div className={styles.content}>
            <div className={styles.events} >
                {eventsList.length === 0 && <h3>Actuellement, il n'y a rien à pourvoir</h3>}
                {eventsList.map((event, index) => (
                    <div key={index} className={styles.event}>
                        <div className={styles.eventImage}>
                            {event.imageId === null
                                ? <Image src={imageLaserGame} alt="" className={styles.image} />
                                : <img src={event.imageId} alt="" className={styles.image} />
                            }
                        </div>
                        <Divider orientation="vertical" variant="middle" flexItem />
                        <div className={styles.eventDetails}>
                            <h3 className={styles.eventTitle}>{event.title}</h3>
                            <p className={styles.eventDescription}>{event.description}</p>
                            <div className={styles.eventAction}>
                                <button className={styles.subscribeEventButton} onClick={() => setOpenModalInfoEvent(event.id)}>En savoir plus</button>
                                <Modal
                                    open={openModalInfoEvent === event.id}
                                    onClose={handleCloseModalInfoEvent}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <div className={styles.modalInfoEvent}>
                                        <p className={styles.titleModal}>{event.title}</p>
                                        <div className={styles.bottomPartModal}>
                                            <div className={styles.leftPartModal}>
                                                <div className={styles.eventOrganizerModal}>
                                                    <p className={styles.organizerTitleModal}>Organisateur :</p>
                                                    <div className={styles.infoOrganizerModal}>
                                                        <p className={styles.organizerNameModal}>{event.organizerFirstName} {event.organizerLastName}</p>
                                                        <a href={event.organizerLinkedinURL} target="_blank" rel="noreferrer">
                                                            {event.organizerImageURL === undefined
                                                                ? <Image src={iconAlumni} className={styles.organizerImageProfileModal} alt="" />
                                                                : <img src={event.organizerImageURL} className={styles.organizerImageProfileModal} alt="" />
                                                            }
                                                        </a>
                                                    </div>
                                                </div>
                                                <p className={styles.dateModal}>{new Date(event.date).toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                                                <p className={styles.descriptionModal}>{event.description}</p>
                                                {nbRegistrations(event) <= 5
                                                    ? <p className={styles.nbRegistrationsModalWarning}>Plus que <span className={styles.nbRegistrationsModalWarningNumber}>{nbRegistrations(event)}</span> places !!</p>
                                                    : <p className={styles.nbRegistrationsModal}>Il reste {nbRegistrations(event)} places</p>
                                                }
                                                <button className={styles.subscribeEventButton} onClick={() => handleSubscribe(event.id, !isSubscribed(event.id))}>
                                                    {isSubscribed(event.id) ? 'Se désinscrire' : 'S\'inscrire'}
                                                </button>
                                            </div>
                                            <div className={styles.rightPartModal}>
                                                {event.imageId === null
                                                    ? <Image src={imageLaserGame} alt="" className={styles.image} />
                                                    : <img src={event.imageId} alt="" className={styles.image} />
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
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
