import RecipeDescription from "@/components/recipe.component/RecipeDescription";
import Instructions from "@/components/recipe.component/Instructions";
import { readRecipeByIdService, readRecipesService } from "@/server/DB/service/recipe.service";
import { connectToMongo } from "@/server/DL/connectToMongo";
import { Footer } from "@/components/Footer";
import styles from './style.module.scss'
import { isEditor } from "@/server/DB/function/userAuth";

export const generateStaticParams = async () => {
  await connectToMongo();
  const res = await readRecipesService();
  return res.map(recipe => ({ recipeName: String(recipe._id) }));
}

export default async function Recipe({ params: { recipeName } }) {
  await connectToMongo();
  const recipe = await readRecipeByIdService(decodeURI(recipeName), true);

  const {
    title = '',
    description = '',
    image = '',
    ingredients = [],
    preparationTime = '',
    CookingTime = '',
    servings = '',
    typeFood = '',
    instructions = '',
    category = '',
  } = recipe || {};
  const imageUrl = image?.image_url ? image.image_url : image;


  return (<>
    {recipe ? <div className={styles.recipeBody} >
      <RecipeDescription
        recipeName={title}
        description={description}
        image={imageUrl}
        category={category[0]}
      />
      <Instructions
        ingredients={ingredients}
        preparationTime={preparationTime}
        CookingTime={CookingTime}
        servings={servings}
        typeFood={typeFood}
        instructions={instructions}
      />
      {isEditor() && <Footer recipeName={recipeName} category={category[0]._id} title={category[0].title} />}

    </div >
      : <h1 >  מתכון לא קיים 😥</h1>
    }
  </>
  );
}
