    import React from "react";

    const Header = ({backgroundPic, title, subHead })=>{
        return (
        <header className="header text-center bg-cover bg-center text-white" style={{ backgroundImage: `url(./images/${backgroundPic})`}}>
            <h1 className="text font-bolder">{title}</h1>
            <p className="text">{subHead}</p>
        </header>
        );
    }

    export default Header;