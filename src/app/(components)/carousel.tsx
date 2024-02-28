import { useState, useEffect } from 'react';
import styles from '../(style)/(styleComponents)/carousel.module.css';

interface CarouselProps {
  eventsList: any[];
}

export default function Carousel({ eventsList }: CarouselProps) {
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    showDivs(slideIndex);
  }, [slideIndex, eventsList]);

  function plusDivs(n: number) {
    setSlideIndex(prevIndex => prevIndex + n);
  }

  function showDivs(n: number) {
    let i;
    const x = document.getElementsByClassName(styles.slide) as HTMLCollectionOf<HTMLElement>;
    if (n > x.length) setSlideIndex(1);
    if (n < 1) setSlideIndex(x.length);
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    if (x[slideIndex - 1]) {
        x[slideIndex - 1].style.display = "flex";
    }
    (document.querySelector("#evenements") as HTMLElement).style.display = "flex";
  }
  
  return (
    <div className={styles.slideshowContainer} id="evenements" style={{display:"none"}}>
      {eventsList.length === 0 && <h3>Aucun evenements pour le moment</h3>}
      {eventsList && (
        <>
          {eventsList.map((event: any, index: number) => (
            <div className={styles.slide} key={index}>
              <div className={styles.slideImg}>
                <img src={event.imageURL} alt={event.title} />
              </div>
              <div className={styles.slideInfo}>
                <div className={styles.slideDate}>{event.date}</div>
                <div className={styles.slideTitle}>{event.title}</div>
                <div className={styles.slideDescription}>{event.description}</div>
              </div>
            </div>
          ))}
          <button className={styles.prevButton} onClick={() => plusDivs(-1)}>&#10094;</button>
          <button className={styles.nextButton} onClick={() => plusDivs(1)}>&#10095;</button>
        </>
      )}
    </div>
  );
}
