import styles from '../(style)/(styleComponents)/articles.module.css';

interface ArticleProps {
    articles: any[];
}

export default function Article(props: ArticleProps) {
    return (
        <div className={styles.article}>
            {props.articles.length === 0 && <h3>Pas d'article pour l'instant</h3>}
            {props.articles.map((article, index) => (
                <div key={index} className={index % 2 === 0 ? styles.articleRow : styles.articleRowInverse}>
                    <div className={styles.content}>
                        <h2>{article.title}</h2>
                        <div>{article.content}</div>
                    </div>
                    <img className={styles.image} src={article.imgURL} alt={article.title} />
                </div>
            ))}
        </div>
    );
}
