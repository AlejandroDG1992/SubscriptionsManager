import React from "react";
import { FaHome, FaChartPie  } from "react-icons/fa";
import "../styles/Home.css";



function Menu(){


    return(
        <>
        <button className="menu-buttons">
            <FaHome className="mr-2 text-red-500"/>
        </button>
        <button className="menu-buttons">
        <FaChartPie/>
        </button>
        </>
    )
}

export default Menu;