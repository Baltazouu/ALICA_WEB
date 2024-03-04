'use client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Offers from "../../(components)/offers";
import styles from "../../(style)/offers.module.css";
import { useState, useEffect } from 'react';
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Offer() {
  const [total, setTotal] = useState(0);
  const [last, setLast] = useState(false);
  const [offersList, setOffersList] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    fetchData();
  }, [page]);

  async function fetchData() {
    try {
      const res = await fetch('/api/offer?page='+page, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      if (res.status === 200) {
        const data = await res.json();
        setLast(data.last);
        setTotal(data.totalElements);
        setOffersList(data.content);
      }else{
        console.error('Failed to fetch offers:', res.statusText);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  }
  
  return (
    <div className={styles.offers}>
      <div className={styles.add}>
        <a href="/offers/add">
          <FontAwesomeIcon icon={faPlus} className={styles.button}/> 
          &ensp;Ajouter une offre
        </a>
      </div>
      <Offers offersList={offersList}/>
      <div className={styles.pagination}>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button>
        <span>{page + 1} / {Math.ceil(total / 10)}</span>
        <button onClick={() => setPage(page + 1)} disabled={last}>Next</button>
      </div>
    </div>
  );
}
