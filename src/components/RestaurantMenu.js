import { useState } from 'react';
import { CDN_URL } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import Shimmer from "./Shimmer";
import vegLogo from'../../assets/veg.png';
import nonVegLogo from'../../assets/nonveg.png';
import { useParams } from 'react-router-dom';

const RestaurantMenu = () => {
    const [isVegOnly, setIsVegOnly] = useState(false);

    const { resId } = useParams();

    const resMenu = useRestaurantMenu(resId);

    const handleVegOnlyChange = (event) => {
        if(event.target.checked) setIsVegOnly(true); 
        else setIsVegOnly(false);
    }

    if(resMenu === null) return <Shimmer />

    const { name, cuisines, cloudinaryImageId, avgRating } = resMenu?.cards[0]?.card?.card?.info;
    const dishData = resMenu?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card?.itemCards;
    console.log(dishData);

    return (
        <div className="flex flex-col justify-center items-center mt-6 mb-7">
            <img className="h-96 w-96 p-5" src={CDN_URL + cloudinaryImageId} />
            <div className="flex flex-row justify-between items-center w-3/5 border-b border-gray-400">
                <div className="res-details-left">
                    <h1 className="mb-3 text-lg font-semibold">{name}</h1>
                    <div>{cuisines.join(", ")}</div>
                    <div className="mt-7 mb-2"> 
                        <input type="checkbox" className="checkbox" name="vegOnly" id="vegOnly" onChange={handleVegOnlyChange}/> 
                        <label className="label" htmlFor="vegOnly">
                            &nbsp;Veg only
                        </label> 
                    </div> 
                </div>
                <div className="res-details-right self-start">
                    <div className="bg-green-600 text-white p-1 text-xs">{"☆" + avgRating}</div>
                </div>
            </div>
            <div className="mt-5 w-3/5">
                {dishData.length === 0}
                {isVegOnly ? 
                    dishData.filter((dish) => {
                        return dish?.card?.info?.itemAttribute?.vegClassifier == "VEG"
                    }).map((dish) => (
                        <div className="flex p-3 justify-between border-b border-gray-300" key={dish.card?.info?.id}>
                            <div className='flex flex-col'>
                                <img className="w-4 h-5 pb-1" src={vegLogo} />
                                <div>{dish?.card?.info?.name}</div>
                                <div className='dish-price'>{"₹" + (dish?.card?.info?.defaultPrice/100 || dish?.card?.info?.price/100)}</div>
                                <div className='text-gray-600 text-sm mt-5'>{dish?.card?.info?.description}</div>
                            </div>
                            <img className="h-40 w-40 ml-16" src={CDN_URL + dish?.card?.info?.imageId} />
                        </div>
                    ))
                : dishData.map((dish) => (
                    <div className="flex p-3 justify-between border-b border-gray-300" key={dish.card?.info?.id}>
                        <div className='flex flex-col'>
                            <img className="w-4 h-5 pb-1" src={dish?.card?.info?.itemAttribute?.vegClassifier == "VEG" ? vegLogo : nonVegLogo} />
                            <div>{dish?.card?.info?.name}</div>
                            <div className='dish-price'>{"₹" + (dish?.card?.info?.defaultPrice/100 || dish?.card?.info?.price/100)}</div>
                            <div className='text-gray-600 text-sm mt-5'>{dish?.card?.info?.description}</div>
                        </div>
                        <img className="h-40 w-40 ml-16" src={CDN_URL + dish?.card?.info?.imageId} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RestaurantMenu;
