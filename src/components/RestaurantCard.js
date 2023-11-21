import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props;
    const { cloudinaryImageId, name, cuisines, costForTwo, avgRating, deliveryTime } = resData;

    return (
        <div className="h-full p-4 w-[210px] hover:cursor-pointer hover:bg-gray-50 hover:shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]">
            <img className="h-[200px] w-[250px]" src={CDN_URL + cloudinaryImageId} />
            <div className="flex justify-between items-center pt-4">
                <h4>{name}</h4>
                <div className="bg-green-600 text-white p-1 text-xs self-start">{"☆" + avgRating}</div>
            </div>
            <div className="text-sm text-gray-500 mt-1">{cuisines.join(", ")}</div>
            <div className="mt-1 text-sm">{costForTwo}</div>
            <h5>{deliveryTime}</h5>
        </div>
    )
}

export default RestaurantCard;