import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../(style)/(styleComponents)/stats.module.css';
import { faCalendarDay, faSuitcase, faUsers } from '@fortawesome/free-solid-svg-icons';

interface StatsProps {
    alumniCount: number;
    offresCount: number;
    evenementsCount: number;
}

export default function Stats(props: StatsProps) {
    return (
        <div className={styles.stats}>
          <div className={styles.box}>
            <FontAwesomeIcon icon={faUsers} className={styles.image}/>
            <div className={styles.title}>Alumni</div>
            <div className={styles.number}>{props.alumniCount}+</div>
          </div>
          <div className={styles.box}>
            <FontAwesomeIcon icon={faSuitcase} className={styles.image}/>
            <div className={styles.title}>Offres</div>
            <div className={styles.number}>{props.offresCount}+</div>
          </div>
          <div className={styles.box}>
            <FontAwesomeIcon icon={faCalendarDay} className={styles.image}/>
            <div className={styles.title}>Evenements</div>
            <div className={styles.number}>{props.evenementsCount}+</div>
          </div>
        </div>
    );
}
