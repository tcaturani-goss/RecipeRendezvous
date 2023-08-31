import React, {useEffect, useState} from 'react'
import './RecipeDetails.css'
import { useParams } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../config/firebaseConfig';
import Likes from '../../components/Likes/Likes';
import Comments from '../../components/Comments/Comments';

function RecipeDetails() {

  const {recipeId} = useParams();
  const [recipe, setRecipe] = useState({});

  // Need to get details for this article from db
  useEffect(() => {
    // Set up a reference to a single doc
    const docRef = doc(db, "recipes", recipeId)

    getDoc(docRef).then((res) => {
        // console.log(res.data());
        setRecipe(res.data())
    }).catch(err => console.log(err))
  }, [])

  return (
    <div className='details-container'>
      <div className='details-content'>
        <div className="details-header-container">
          <h1>{recipe?.title}</h1>
          <Likes recipeId={recipeId}/>
        </div>
        <img src={recipe?.imageURL} alt="" className="details-img" />
        <h2>{recipe?.description}</h2>
      </div>
      <Comments recipeId={recipeId} />
    </div>
  )
}

export default RecipeDetails