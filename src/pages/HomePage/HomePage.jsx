import React from 'react'
import './Homepage.css'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import RecipeCategoryContainer from '../../components/RecipeCategoryContainer/RecipeCategoryContainer'

function Homepage() {
  return (
    <div>
        <RecipeCategoryContainer />
        <RecipeCard />
    </div>
  )
}

export default Homepage