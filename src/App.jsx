import React, { } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Homepage from './pages/HomePage/Homepage'
import RecipeCategories from './pages/RecipeCategories/RecipeCategoriesArticle'
import Auth from './pages/Auth/Auth'
import AddRecipe from './pages/AddRecipe/AddRecipe'
import RecipeDetails from './pages/RecipeDetails/RecipeDetails'

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/addRecipe" element={<AddRecipe />} />
        <Route path="/category/:categoryName" element={<RecipeCategories/>}/>
        <Route path="/recipe/:recipeId" element={<RecipeDetails/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
