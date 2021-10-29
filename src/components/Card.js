import React from 'react';

const Card = ({country}) => {

    const numFormat = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    return (
        <li className="card">
            <img src={country.flags[1]} alt="flag"/>
            <div className="data-container">
                <ul className="data-container">
                    <li>{country.name.common}</li>
                    <li>{country.capital[0]}</li>
                    <li>Pop :  {numFormat(country.population)}</li>
                </ul>
            </div>
        </li>
    );
};

export default Card;