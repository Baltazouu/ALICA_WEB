import styles from '../(style)/(styleComponents)/searchbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function SearchBar() {
    return (
        <div className={styles.search}>
            Découvrez les profils d'alumnis !
            <a className={styles.profilButton} href='/alumni'>Voir tous les profils</a>
            {/* <div className={styles.searchLine}>
                <input className={styles.searchBar} type="text" placeholder="Rechercher des alumni..."/>
                <a className={styles.searchButton} href="">
                    <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon}/>
                </a>
            </div> */}
            <a className={styles.searchLine} href='/alumni'>
                Rechercher des alumni...
                <FontAwesomeIcon icon={faMagnifyingGlass} className={styles.icon}/>
            </a>
        </div>
    )
}