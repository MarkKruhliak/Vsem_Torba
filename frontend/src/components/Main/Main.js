import React from 'react';
import {Link} from "react-router-dom";
import css from "../../app.module.css"

export const Main = () => {
    return (
        <div className={css.mainBlockForMainPage}>
            <div className={css.blockFor3PartOfScreen}> </div>
            <div className={css.vsemTorbaLogo1}>Vsem</div>
            <div className={css.vsemTorbaLogo2}>Torba</div>
            <p className={css.descriptionOfShop}>Lorem ipsum
                dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                id est laborum.</p>
            <Link to={'/shop'}>
                <button
                    className={css.buttonForComeToShop}
                    style={{border: '2px solid #FFFFFF'}}>Перейти у магазин
                </button>
            </Link>
        </div>
    );
};

