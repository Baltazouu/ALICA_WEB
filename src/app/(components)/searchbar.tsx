import styles from '../(style)/(styleComponents)/searchbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
    return (
        <div className={styles.search}>
            Découvrez les profils d'alumnis !
            <button className={styles.profilButton} onClick={() => {}}>Voir tous les profils</button>
            <div className={styles.searchLine}>
                <input className={styles.searchBar} type="text" placeholder="Rechercher des alumni..."/>
                <a className={styles.searchButton} href="">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon}/>
                </a>
            </div>
        </div>
    )
}