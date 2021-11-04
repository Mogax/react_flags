import React, {useEffect, useState} from 'react';
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import axios from "axios";
import Article from "../components/Article";

const News = () => {

    const [newsData, setNewsData] = useState([])
    const [author, setAuthor] = useState("")
    const [content, setContent] = useState("")
    const [error, setError] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = () =>{
        axios.defaults.baseURL = 'http://localhost:3003';
        axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
        axios.get('articles')
            .then((res) => {
                setNewsData(res.data.reverse())
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(content.length < 140){
            setError(true)
        }else{
        axios.post('http://localhost:3003/articles', {
            author,
            content,
            date: Date.now()
        }).then(()=>{
            setError(false)
            setAuthor("")
            setContent("")
            getData()
        })
        }
    }

    return (
        <div className="news-container">
            <Navigation />
            <Logo />
            <h1>News</h1>

            <form onSubmit={(e) => handleSubmit(e)}>
                <input onChange={(e)=> (setAuthor(e.target.value))} type="text" name="nom" placeholder="Nom" value={author}/>
                <textarea style={{border: error?"1px solid red" : "1px solid #00CCFF"}} onChange={(e)=>{setContent(e.target.value)}} placeholder="Message" value={content}/>
                {error && <p>Veuillez écrire un minimum de 140 caractères</p>}
                <input type="submit"/>
            </form>
            <ul>{newsData.map((article)=>(
                <Article key={article.id} article={article}/>
            ))}</ul>
        </div>
    );
};

export default News;