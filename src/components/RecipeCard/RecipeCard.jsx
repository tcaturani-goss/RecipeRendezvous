import React, {useEffect, useState} from 'react'
import './RecipeCard.css'
import { collection, getDocs, query, limit } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig'
import { useNavigate, Link } from 'react-router-dom'

function RecipeCard() {

  // Get data when recipe card loads
  const [recipes, setRecipes] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
      //Create variable to reference the article collection
      const recipesRef = collection(db, "recipes")


      // Setup query to filter responses
      // Sort and then get the first 5
      const q = query(recipesRef, limit(5))


      //Get recipes from the db 
      getDocs(q,recipesRef)
      .then(res => {
        // console.log(res.docs[0].data())
        const recipes = res.docs.map((item) => {
          return {
            ...item.data(),
            id: item.id,
          };
        });
        console.log(recipes);
        setRecipes(recipes);
      })
      .catch((err) => console.log(err));

  }, []);


  return (
<div className='recipe-card-flex'>
  {recipes.map(recipe => (
    <div key={recipe?.id} className='recipe-card-main-container' onClick={(e) => navigate(`/recipe/${recipe?.id}`)} style={{backgroundImage: `url(${recipe?.imageURL})`}}>
      <Link><img className='recipe-cards-img' src={recipe.imageURL} alt={recipe.title} /></Link>
      <div className='recipe-cards-info'>
        <p className='recipe-card-title'>{recipe.title}</p>
        <p className='recipe-card-description'>{recipe.description}</p>
      </div>
    </div>
  ))}
</div>
  )
}

export default RecipeCard