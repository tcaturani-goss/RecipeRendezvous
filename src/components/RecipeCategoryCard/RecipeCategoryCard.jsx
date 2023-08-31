import React from 'react'
import './RecipeCategoryCard.css'
import { Link } from 'react-router-dom'

function RecipeCategoryCard({recipe}) {
  return (
    <div>
      <div key={recipe.id} className='recipe-card-main-container' style={{backgroundImage: `url(${recipe?.imageURL})`}}>
      <Link to={`/recipe/${recipe?.id}`}><img className='recipe-cards-img' src={recipe.imageURL} alt={recipe.title} /></Link>
      <div className='recipe-cards-info'>
        <p className='recipe-card-title'>{recipe.title}</p>
        <p className='recipe-card-description'>{recipe.description}</p>
      </div>
    </div>
    </div>
  )
}

export default RecipeCategoryCard