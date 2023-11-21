import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Body = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [searchText, setSearchText ] = useState("");
    const [topRatedCheck, setTopRatedCheck ] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.1702401&lng=72.83106070000001&page_type=DESKTOP_WEB_LISTING");
        const response = await res.json();
        setListOfRestaurants(response?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(response?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    }
    
    return listOfRestaurants && listOfRestaurants.length === 0 ? <Shimmer /> :  (
        <div className="mx-20 my-4">
            <div className="flex mb-10 mt-10 ml-4">
                <div className="mr-8">
                    <input type="text" className="border border-black mr-4 p-1 w-64 ml-2 placeholder:text-slate-400" placeholder="Search for Restaurants..." value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }}></input>
                    <button className="border border-slate-500 bg-white cursor-pointer p-1 text-slate-500 rounded-md hover:bg-slate-100" onClick={() => {
                        const searchedRestaurants = listOfRestaurants.filter(r => {
                            const restName = (r.info.name).toLocaleLowerCase();
                            return (restName.includes(searchText.toLocaleLowerCase()));
                        });
                        setFilteredRestaurants(searchedRestaurants);
                    }}>Search</button>
                </div>
                <div className="mr-8 px-3">
                    <button className="border border-slate-500 bg-white cursor-pointer p-1 text-slate-500 rounded-md hover:bg-slate-100" 
                        style={{ backgroundColor: topRatedCheck ?  "white" : "rgb(231, 226, 226)" }} 
                        onClick={() => {
                        setTopRatedCheck(!topRatedCheck);
                        if (!topRatedCheck) {
                            setFilteredRestaurants(listOfRestaurants);
                        } else {
                            const filteredRestaurants = listOfRestaurants.filter(x => x.info.avgRating > 4);
                            setFilteredRestaurants(filteredRestaurants);
                        }
                    }}>Top Rated Restaurants</button>
                </div>
            </div>
            <div className="flex flex-wrap">
                { filteredRestaurants && filteredRestaurants.map((restaurant) => (
                <Link className="m-2" key={restaurant.info.id} style={{textDecoration: 'none', color: 'black'}} to={"/restaurant/" + restaurant.info.id}><RestaurantCard resData={restaurant.info}/></Link>
            ))}
            </div>
        </div>
    )
}

export default Body;