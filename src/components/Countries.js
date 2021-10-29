import React, {useEffect, useState} from 'react';
import axios from "axios";
import Card from "./Card";

const Countries = () => {

    const [data, setData] = useState([]);
    const [sortedData, setSortedData] = useState([])
    const [playOnce, setPlayOnce] = useState(true)
    const [rangeValue, setRangeValue] = useState(250)
    const [selectedRadio, setSelectedRadio] = useState('')
    const radios = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
    const [popMin, setPopMin] = useState(0)
    const [popMax, setPopMax] = useState(1402112000)

    const numFormat = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }

    useEffect(()=>{

        if(playOnce) {
            axios.get('https://restcountries.com/v3/all/?fields=name,population,region,capital,flags')
                .then((res) => {
                    setData(res.data)
                    setPlayOnce('false');
                })
        }

        const sortedCountry = () => {
            const countryObj = Object.keys(data).map((i) => data[i]);
            let arraySorted =  countryObj.sort((a, b) => {
                if(a.name.common > b.name.common) return 1
                else return -1
            }).filter(country=>country.region.includes(selectedRadio)).filter(country=>(country.population>=popMin && country.population<=popMax))

            arraySorted.length = rangeValue
            setSortedData(arraySorted)

            }
        sortedCountry()

    }, [data, rangeValue, selectedRadio, popMax, popMin, playOnce])

    return (
        <div className="countries">
            <div className="sort-container">
                <input type="range" min="1" max="250" value={rangeValue} onChange={(e)=>{
                    setRangeValue(e.target.value)
                }}/>

                <ul>
                    {radios.map((radio) => {
                        return(
                            <li key={radio}>
                                <input type="radio" value={radio} id={radio} checked={radio===selectedRadio}
                                       onChange={(e)=> setSelectedRadio(e.target.value)}/>
                                <label htmlFor={radio}>{radio}</label>
                            </li>
                        )
                    })}
                </ul>

                <div className="population">
                    <div className="range">
                        <label htmlFor="popMin">Population min : <span>{numFormat(popMin)}</span></label>
                        <input type="range" id="popMin" min="0" max="1402112000" value={popMin} step="1000"
                               onChange={(e) => {
                                   if(e.target.value<=parseInt(popMax)) setPopMin(e.target.value)
                               }
                               }/>
                    </div>
                    <div className="range">
                        <label htmlFor="popMax">Population max : <span>{numFormat(popMax)}</span></label>
                        <input type="range" id="popMax" min="0" max="1402112000" value={popMax} step="1000"
                               onChange={(e) => {
                                   if(e.target.value>=parseInt(popMin)) setPopMax(e.target.value) }
                               }/>
                    </div>
                </div>

            </div>

            <div className="cancel" >
                {selectedRadio && <h5 onClick={() => setSelectedRadio('')}>Annuler recherche</h5>}
            </div>

            <ul className="countries-list">
                {sortedData.map((country) => (
                    <Card country={country} key={country.name.common}/>
                ))}
            </ul>

        </div>
    );
};

export default Countries;