import React, {useState} from 'react';
import axios from "axios";
import DeleteArticle from "./DeleteArticle";

const Article = ({article}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState(article.content)

    const dateParser = (date) => {
        let newDate = new Date(date).toLocaleDateString('fr-FR', {
            year: "numeric",
            month: "long",
            day: "numeric"
        })
        return newDate
    }

    const data = {
        author: article.author,
        content: editedContent,
        date: Date.now()
    }

    const handleEdit = () =>{
        axios.put("http://localhost:3003/articles/"+article.id, data)
            .then(setIsEditing(false))
    }

    return (
        <div className="article" style={{background: isEditing?"rgba(0,204,255,0.1)":"white"}}>
            <div className="car-header">
                <h3>{article.author}</h3>
                <em>Posté la {dateParser(article.date)}</em>
            </div>
            {isEditing ? (
                <textarea
                    onChange={(e)=>(setEditedContent(e.target.value))}
                    autoFocus
                    defaultValue={editedContent ? editedContent : article.content}/>
            ) : (
                <p>{editedContent ? editedContent : article.content}</p>
            )}

            {isEditing ? (
                <div className="btn-container">
                    <button onClick={handleEdit}>Valider</button>
                </div>
            ) : (
                <div className="btn-container">
                    <button onClick={()=> setIsEditing(true)}>Edit</button>
                    <DeleteArticle id={article.id} />
                </div>
            )}
        </div>
    );
};

export default Article;