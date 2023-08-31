import React, { useEffect, useState } from 'react';
import './RecipeCategoriesArticle.css';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import RecipeCategoryCard from '../../components/RecipeCategoryCard/RecipeCategoryCard';
import RecipeCategoryContainer from '../../components/RecipeCategoryContainer/RecipeCategoryContainer';

function RecipeCategories() {
  const [recipes, setRecipes] = useState([]);
  const { categoryName } = useParams();

  useEffect(() => {
    // Create a reference to firestore db recipes collection
    const recipesRef = collection(db, 'recipes');

    // Now get the data that matches the category
    const q = query(recipesRef, where('category', '==', categoryName));

    // Now get data that matches the query
    getDocs(q, recipesRef)
      .then((res) => {
        const recipes = res.docs.map((item) => {
          return {
            ...item.data(),
            id: item.id,
          };
        });
        console.log(recipes);
        setRecipes(recipes);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
      });
  }, [categoryName]);

  return (
    <div>
      <RecipeCategoryContainer />
      <div className='recipe-card-flex'>
        {recipes.map((item) => (
          <RecipeCategoryCard key={item.id} recipe={item} />
        ))}
      </div>
    </div>
  );
}

export default RecipeCategories;