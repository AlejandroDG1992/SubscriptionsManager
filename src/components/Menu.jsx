import React from "react";
import { FaHome, FaChartPie  } from "react-icons/fa";
import "../styles/Home.css";



function Menu(){


    return(
        <>
        <button >
            <FaHome/>
        </button>
        <button>
        <FaChartPie/>
        </button>
        </>
    )
}

export default Menu;