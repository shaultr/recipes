import styles from "./style.module.scss";

export default function Instructions({
  ingredients,
  preparationTime,
  CookingTime,
  servings,
  typeFood,
  instructions,
}) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>
          <h4>זמן הכנה</h4>
          <div className={styles.content}>{preparationTime}</div>
        </div>
        <div className={styles.title}>
          <h4>זמן בישול/אפיה</h4>
          <div className={styles.content}>{CookingTime}</div>
        </div>
        <div className={styles.title}>
          <h4>מספר מנות</h4>
          <div className={styles.content}>{servings}</div>
        </div>
        <div className={styles.type}>
          <h4>סוג</h4>
          <div className={styles.content}>{typeFood}</div>
        </div>
      </div>
      <h1> רכיבים</h1>
      {
        <ul>
          {ingredients.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      }
      <h1> אופן ההכנה</h1>
      <p> {instructions} </p>
    </div>
  );
}
