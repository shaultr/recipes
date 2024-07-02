import { cretaeCategoryAction } from "@/server/DB/actions/recipe.action";
import styles from "./style.module.scss";

export default function AddCategory() {
    return (
        <div className={styles.container}>
            <h2>קטגוריה חדשה</h2>
            <form action={cretaeCategoryAction} >
                <input type="text" name="title" placeholder="שם הקטגוריה" required />
                <div class={styles.color}>
                   בחר צבע תוית
                    <input type="color" name="colorLabel" placeholder="שם הקטגוריה" value={'#2DB4AB'} />
                </div>
                הוסף תמונה
                <input type="file" name="image" required/>
                <button className={styles.btn} type="submit" >צור קטגוריה</button>
            </form>
        </div>
    )
}
