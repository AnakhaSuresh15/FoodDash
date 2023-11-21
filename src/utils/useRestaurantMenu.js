import { MENU_URL } from "../utils/constants";
import { useEffect, useState } from 'react';

const useRestaurantMenu = (resId) => {
    const [resInfo, setResInfo] = useState(null);
    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const url = MENU_URL + resId;
        const res = await fetch(url);
        const jsonRes = await res.json();
        setResInfo(jsonRes?.data);
    }
    return resInfo;
}

export default useRestaurantMenu;