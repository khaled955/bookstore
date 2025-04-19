
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import { BookDetailsInfo, booksinfo, categoryShowItem } from "../../Interfaces/Interfaces";
import Card from "../Card/Card";
import { useState } from "react";

import carlesspeople from "../../assets/images/carlespeople.jpg";
import housemade from "../../assets/images/housemade.jpg";
import theleetthem from "../../assets/images/leetthem.jpg";
import reunion from "../../assets/images/reunion on prague.jpg";
import sunrise from "../../assets/images/sunrise.jpg";
import thelatestmomement from "../../assets/images/thelastmoment.jpg";
import thenextconversation from "../../assets/images/thenextconversation.jpg";
import thedesertofglass from "../../assets/images/thedesertofglass.jpg";

export default function AllCategoryShow() {
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const bookDetails: booksinfo[] = [
    { nameofbook: "Careless People", details: "...", photo: carlesspeople },
    { nameofbook: "The HOUSE MAID", details: "...", photo: housemade },
    { nameofbook: "The LEET THEM", details: "...", photo: theleetthem },
    { nameofbook: "REUNION PRAGUE", details: "...", photo: reunion },
    { nameofbook: "SUNRISE ON THE REAPING", details: "...", photo: sunrise },
    { nameofbook: "THE LAST MONUMENT", details: "...", photo: thelatestmomement },
    { nameofbook: "THE NEXT CONVERSATION", details: "...", photo: thenextconversation },
    { nameofbook: "THE DESERT OF GLASS", details: "...", photo: thedesertofglass },
  ];

  async function getAllCategoriesFromUpskilling() {
    return axios.get("https://upskilling-egypt.com:3007/api/category");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["CategoriesShow"],
    queryFn: getAllCategoriesFromUpskilling,
    retry: true,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnMount: false,
  });

  if (isLoading) return <Loading />;

  // Filter logic
  const filteredCategories = selectedCategory === "All"
    ? data?.data
    : data?.data.filter((cat: categoryShowItem) =>
        staticCategories.find(sc => sc.name === selectedCategory)?.name ===
        staticCategories[data?.data.indexOf(cat)]?.name
      );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">📚 Book Categories</h2>

      {/* Dropdown to select category */}
      <div className="mb-6 text-center">
        <label htmlFor="category" className="mr-2 font-semibold">Select a Category:</label>
        <select
          id="category"
          className="p-2 border border-gray-300 rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          {staticCategories.map((cat) => (
            <option key={cat.name} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Categories Display */}
      <div>
        {filteredCategories.length === 0 ? (
          <p className="text-center text-red-500 text-lg font-semibold">No books to display</p>
        ) : (
          filteredCategories.map((category: categoryShowItem, index: number) => (
            <div key={category._id} className="p-6">
              <div className="flex gap-2 items-center mb-4">
                <i className={`fa-solid ${staticCategories[index]?.icon} text-blue-500 text-2xl`}></i>
                <p className="text-lg font-semibold text-gray-700">{staticCategories[index]?.name}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {category.books.length === 0 ? (
                  <p className="text-gray-500">No books in this category.</p>
                ) : (
                  category.books.map((book: BookDetailsInfo, currentIndex: number) => (
                    <Card
                      key={book._id}
                      productInfo={book}
                      books={bookDetails[currentIndex]}
                      index={index}
                    />
                  ))
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
