import { SearchBar } from "@/components/SearchBar";
import styles from "./style.module.scss";
import Photo from "@/components/Photo";
import { connectToMongo } from "@/server/DL/connectToMongo";
import { readCategorysService } from "@/server/DB/category.service";
import Navlink from "@/components/NavLink";
import DeleteCategory from "@/components/DeleteCategory";

export default async function Home() {
  await connectToMongo();
  const categories = await readCategorysService();

  return (
    <main className={styles.main}>
      <SearchBar />
      <div className={styles.photoContainer}>
        {categories?.map((category, index) => (
          <div key={index} className={styles.categoryItem}>
            <Navlink href={`/category/${category.title}`}>
              <Photo data={category} typeObj={"category"} />
            </Navlink>
            {category?.recipes.length === 0 && <div className={styles.btn}>
                <DeleteCategory categoryId={category._id} />
            </div>}
          </div>
        ))}
      </div>
    </main>
  );
}
