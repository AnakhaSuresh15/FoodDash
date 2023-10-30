import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const { resData } = props;
    const { cloudinaryImageId, name, cuisines, costForTwo, avgRating, deliveryTime } = resData;

    return (
        <div className="res-card">
            <img className="res-image" src={CDN_URL + cloudinaryImageId} />
            <div className="cardTitle">
                <h4 className="res-name">{name}</h4>
                <div className="rating-box">{avgRating}</div>
            </div>
            <div className="cuisines">{cuisines.join(", ")}</div>
            <div className="costForTwo">{costForTwo}</div>
            <h5>{deliveryTime}</h5>
        </div>
    )
}

export default RestaurantCard;