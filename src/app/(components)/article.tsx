import styles from '../(style)/(styleComponents)/article.module.css';

interface ArticleProps {
    article :{title: string, body: string, image: string},
    inverse: boolean;
}  

export default function Article(props: ArticleProps) {
    return (
        <div className={styles.article}>
            {props.article ? (
                <>
                {props.inverse ? (
                    <><div className={styles.content}>
                        <h2>{props.article.title}</h2>
                        <div>{props.article.body}</div>
                    </div>
                    <img className={styles.image} src={props.article.image} alt={props.article.title} /></>
                ): (
                    <><img className={`${styles.image} ${styles.imageInverse}`} src={props.article.image} alt={props.article.title} />
                    <div className={`${styles.content} ${styles.contentInverse}`}>
                        <h2>{props.article.title}</h2>
                        <div>{props.article.body}</div>
                    </div></>
                )}
                </>
            ):(<></>)}
        </div>
    )
}