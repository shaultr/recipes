import styles from './style.module.css'
import Label from "@/components/Label";
import Image from 'next/image'

export default async function RecipeDescription({ recipeName, description, image,category }) {
    return (
        
        <div className={styles.container}>
            <div className={styles.description}>
                <Label data={category.title} color={category.colorLabel} size={'40'} />
                <h1>{recipeName}</h1>
                <p>
                    {description}
                </p>
            </div>
            <Image className={styles.image}
                src={image}
                width={1000}
                height={1000}
                alt="Picture of the author"
            />
        </div>
    )
}
