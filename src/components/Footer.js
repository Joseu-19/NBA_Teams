import React from "react";

const Footer = ({footTxt}) => {
    return (
        <footer className="footer bg-neutral text-neutral-content items-center p-4">
            <div className="grid-flow-col items-center">
                <p className="footerText">{footTxt}</p>
            </div>
        </footer>
    );
}

export default Footer;