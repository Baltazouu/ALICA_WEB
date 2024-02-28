'use client';
import Articles from "./(components)/articles";
import Carousel from "./(components)/carousel";
import Offers from "./(components)/offers";
import SearchBar from "./(components)/searchbar";
import Stats from "./(components)/stats";
import styles from "./(style)/page.module.css";
import Bandeau from "./../../public/images/BandeauCreerAsso.png";
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";

export default function About() {
  const [eventsList, setEventsList] = useState([{}]);
  const [offersList, setOffersList] = useState([{}]);
  const [articlesList, setArticlesList] = useState([{}]);
  const [alumnisList, setAlumnisList] = useState([{}]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch('/api/event', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 200) {
        const data = await res.json();
        setEventsList(data.content);
      }else{
        console.error('Failed to fetch events:', res.statusText);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
    try {
      const res = await fetch('/api/offer', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 200) {
        const data = await res.json();
        setOffersList(data.content);
      }else{
        console.error('Failed to fetch offers:', res.statusText);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
    try {
      const res = await fetch('/api/article', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 200) {
        const data = await res.json();
        setArticlesList(data.content);
      }else{
        console.error('Failed to fetch articles:', res.statusText);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
    try {
      const res = await fetch('/api/alumni', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (res.status === 200) {
        const data = await res.json();
        setAlumnisList(data.content);
      }else{
        console.error('Failed to fetch alumnis:', res.statusText);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  }
    

  const { data: session } = useSession();

  return (
      <div className={styles.about}>
        <div className={styles.banner}>
          <img src={Bandeau.src} alt="banner" className={styles.image}/>
          <div className={styles.text}>
            <h3>Le réseau ALICA</h3>
            <h2>ALICA - info</h2>
            <h3>te souhaite la bienvenue !</h3>
            <p>Nous sommes d'anciens étudiants à l'IUT d'Aubière qui aimerions créer un réseau d'anciens étudiants au travers d'un réseau alumni du département Informatique.</p>
            <a href="#articles">En savoir plus</a>
          </div>
        </div>
        <div id="events">
          <Carousel eventsList={eventsList} />
        </div>
        <div id="articles">
          <Articles articles={articlesList} />
        </div>
        <SearchBar />
        <div id="offers">
          <Offers offersList={offersList}/>
        </div>
        <Stats alumniCount={alumnisList.length} offresCount={offersList.length} evenementsCount={eventsList.length}/>
      </div>
  );
}
