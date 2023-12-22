import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {DetailWrapper , Button , Info} from '../style/styles'

function Details(){
    let params = useParams();

    useEffect(()=>{
        getRecipe(params.item);
        
    },[params.item]);


    const [recipe , setRecipre] = useState({});
    const [activeTab , setActiveTab] = useState('instructions');


    const getRecipe = async (item)=>{
        const api = await fetch(`http://localhost:3000/v1/food/${item}`);
        const response = await api.json();
        setRecipre(response);
    }

    return(
        <DetailWrapper>
            {recipe ?
             (
                recipe.name === undefined ? (
                    <h1>در حال بارگذاری...</h1>
                ) : (
                    <>
                            <div>
                     <h2>{recipe.name}</h2>
                    <img src={`http://localhost:3000/foods/covers/${recipe.covers["1"]}`}
                        alt={recipe.name} />
                    </div>

                    <Info >
                    <Button className={activeTab === 'instructions' ? 'active' : ''}
                    onClick={()=>{setActiveTab('instructions')}}>دستور پخت</Button>
                    <Button className={activeTab === 'ingridients' ? 'active' : ''}
                    onClick={()=>{setActiveTab('ingridients')}}>مواد لازم</Button>

                    {activeTab === 'ingridients' && (
                        <div>
                            <p dangerouslySetInnerHTML={{ __html : recipe.ingridients}}></p>
                    </div>
                    )}
                        {activeTab === 'instructions' && (
                            
                            <p>{recipe.instruction}</p>
                        
                    )} 
                    
                    
                    </Info>
                    </>
                )
                ) : null}

            
           
        </DetailWrapper>
    );
}

export default Details;