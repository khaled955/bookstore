/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { categoryDetailsItem, RootState } from "../../Interfaces/Interfaces"
import Loading from "../Loading/Loading"

export default function CategoryDetails() {
    const {catId ,index} = useParams()
  

const [categoriesBooks , setCategoriesBooks] = useState< categoryDetailsItem | null>(null)

const {token} = useSelector((store:RootState)=>store.userReducer)

const currentIndex = index? +index : 0
async function getCategoriesBooksFromApiUpskilling(){

try {

    const options = {
        url:`https://upskilling-egypt.com:3007/api/category/${catId}`,
        method:"GET",
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
          "Content-Type": "application/json",
        },
      }


     const{data} = await axios.request(options)

  setCategoriesBooks(data)

} catch (error ) {
    console.log(error)
}





}


useEffect(()=>{

     getCategoriesBooksFromApiUpskilling()
},[])



const staticCategories = [
    { name: "Fiction", icon: "fa-book-open" },
    { name: "Science Fiction", icon: "fa-robot" },
    { name: "Fantasy", icon: "fa-hat-wizard" },
    { name: "Mystery & Thriller", icon: "fa-user-secret" },
    { name: "Romance", icon: "fa-heart" },
    { name: "Horror", icon: "fa-ghost" },
    { name: "Historical Fiction", icon: "fa-landmark" },
    { name: "Biography & Memoir", icon: "fa-user" },
    { name: "Self-Help & Motivation", icon: "fa-hand-holding-heart" },
    { name: "Business & Finance", icon: "fa-chart-line" },
    { name: "Technology & AI", icon: "fa-microchip" },
    { name: "Science & Nature", icon: "fa-flask" },
    { name: "Philosophy & Psychology", icon: "fa-brain" },
    { name: "Health & Fitness", icon: "fa-heart-pulse" },
    { name: "Cookbooks & Food", icon: "fa-utensils" },
    { name: "Travel & Adventure", icon: "fa-globe" },
    { name: "Poetry", icon: "fa-feather-pointed" },
    { name: "Education & Learning", icon: "fa-graduation-cap" },
    { name: "Children's Books", icon: "fa-child" },
  ];



  return (<>
      <div className="p-6 space-y-4">
          <h2 className="text-gray-800 font-bold text-3xl">Category Details</h2>

    {!categoriesBooks ? <Loading/> :<div className="">
            
        <div
           
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center hover:shadow-xl transition-shadow duration-300"
          >
            <i className={`fa-solid ${staticCategories[currentIndex].icon} text-blue-500 text-3xl mb-3`}></i>
            <p className="text-lg font-semibold text-gray-700">{staticCategories[currentIndex].name}</p>
          </div>








    </div>}

    </div>


    </>
  )
}
