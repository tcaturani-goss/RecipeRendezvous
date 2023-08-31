import React from 'react'
import './RecipeCategoryContainer.css'
import { auth } from '../../config/firebaseConfig';
import { useAuthState} from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom'

function RecipeCategoryContainer() {

  const [user] = useAuthState(auth);
  console.log(user)
  
  const catgories = ["Chicken", "Beef", "Soup", "Salad", "Vegetables"]

  return (
    <div>
      <div className="recipe-categories-main-container">
        {catgories.map((item, index) => (
          <Link to={`/category/${item}`} key={index} className='recipe-category-link'>{item}</Link>
          ))}
      </div>
      <div className="add-recipe-button-container">
      { user && (
         <Link to="/addRecipe" className='auth-link'>
           Add Recipe
         </Link>
      )}
      </div>
    </div>
  )
}

export default RecipeCategoryContainer