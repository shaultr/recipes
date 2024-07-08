import Navlink from "../../NavLink";
import styles from "./style.module.scss";

export default function NoRecipes() {
  return <div className={styles.container} >
    <h2>אופס, לא נמצאו מתכונים כרגע </h2><br /> 
    <Navlink href={`/`}> <h3>חזרה</h3></Navlink>
    
  </div>;
}
