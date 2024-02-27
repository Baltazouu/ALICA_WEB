'use client';
import Article from "./(components)/article";
import Carousel from "./(components)/carousel";
import Offers from "./(components)/offers";
import SearchBar from "./(components)/searchbar";
import Stats from "./(components)/stats";
import styles from "./(style)/page.module.css";
import Bandeau from "./../../public/images/BandeauCreerAsso.png";

export default function About() {
  let eventsList = [
    {
      "date": "date",
      "title": "title",
      "description": "description",
      "image": "https://www.html.am/images/html-codes/links/boracay-white-beach-sunset-300x225.jpg"
    },
    {
      "date": "date2",
      "title": "title2",
      "description": "description2",
      "image": "https://www.html.am/images/html-codes/links/boracay-white-beach-sunset-300x225.jpg"
    }
  ];

  const fetchData = async () => {
    const res = await fetch(process.env.API_URL + '/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const data = await res.json();
    eventsList=data.content;
    //TOFINISH
  };
  
  fetchData();
  
  return (
      <div className={styles.about}>
        <div className={styles.banner}>
          <img src={Bandeau.src} alt="banner" className={styles.image}/>
          <div className={styles.text}>
            <h3>Le réseau ALICA</h3>
            <h2>ALICA - info</h2>
            <h3>te souhaite la bienvenue !</h3>
            <p>Nous sommes d'anciens étudiants à l'IUT d'Aubière qui aimerions créer un réseau d'anciens étudiants au travers d'un réseau alumni du département Informatique.</p>
            <button>En savoir plus</button>
          </div>
        </div>
        <Carousel eventsList={eventsList} />
        <Article article={{
            title: "article",
            body: "blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla",
            image: "https://www.html.am/images/html-codes/links/boracay-white-beach-sunset-300x225.jpg"
          }} inverse={false} />
          <Article article={{
            title: "article",
            body: "blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla blablablabla",
            image: "https://www.html.am/images/html-codes/links/boracay-white-beach-sunset-300x225.jpg"
          }} inverse={true} />
        <SearchBar />
        <Offers/>
        <Stats />
      </div>
  );
}
