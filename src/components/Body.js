import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useState, useEffect } from "react";

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
    
    return listOfRestaurants.length === 0 ? <Shimmer /> :  (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-text" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }}></input>
                    <button className="filter-btn" onClick={() => {
                        const searchedRestaurants = listOfRestaurants.filter(r => {
                            const restName = (r.info.name).toLocaleLowerCase();
                            return (restName.includes(searchText.toLocaleLowerCase()));
                        });
                        setFilteredRestaurants(searchedRestaurants);
                    }}>Search</button>
                </div>
                <div className="search">
                    <button className="filter-btn" 
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
            <div className="res-container">
                { filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.info.id} resData={restaurant.info}/>
            ))}
            </div>
        </div>
    )
}

export default Body;