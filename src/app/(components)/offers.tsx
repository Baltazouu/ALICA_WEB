import styles from '../(style)/(styleComponents)/offers.module.css';

interface OffersProps {
    offersList: any[];
}

export default function Offers({ offersList }: OffersProps) {
    return (
        <div className={styles.content}>
            <h2>Offres :</h2>
            <hr />
            <div className={styles.offers}>
                {offersList.length === 0 && <h3>Actuellement, il n'y a rien à pourvoir</h3>}
                {offersList.map((offer, index) => (
                    <div key={index} className={styles.offer}>
                        <div className={styles.offerHeader}>
                            <img src={offer.image} alt="" className={styles.image} />
                            <h3>{offer.title} ({offer.contract})</h3>
                        </div>
                        <div className={styles.offerDetails}>
                            <h4>{offer.city}, {offer.level}</h4>
                            <p>{offer.description}</p>
                            <a href={offer.companyURL}>En savoir plus &#10095;</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}