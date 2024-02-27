import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../(style)/(styleComponents)/stats.module.css';
import { faCalendarDay, faSuitcase, faUsers } from '@fortawesome/free-solid-svg-icons';

export default function Stats() {
    return (
        <div className={styles.stats}>
          <div className={styles.box}>
            <FontAwesomeIcon icon={faUsers} className={styles.image}/>
            <div className={styles.title}>Alumni</div>
            <div className={styles.number}>200+</div>
          </div>
          <div className={styles.box}>
            <FontAwesomeIcon icon={faSuitcase} className={styles.image}/>
            <div className={styles.title}>Offres</div>
            <div className={styles.number}>35+</div>
          </div>
          <div className={styles.box}>
            <FontAwesomeIcon icon={faCalendarDay} className={styles.image}/>
            <div className={styles.title}>Evenements</div>
            <div className={styles.number}>11+</div>
          </div>
        </div>
    )
}