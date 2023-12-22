// import { motion } from "framer-motion";
import { Link , useParams } from "react-router-dom";
import { useState  , useEffect} from "react";
import { Cart } from "../style/styles";
import { motion } from "framer-motion";
import styled from "styled-components";

function Cuisine(){
    const params = useParams();

    useEffect (() => {
        getCategory(params.type);
    }, [params.type]);

    const [cuisine , setCuisine] = useState([]);
    
    const getCategory = async (name) => {

        const data = await fetch(`http://localhost:3000/v1/food/category${name}`);
        const response = await data.json();
        setCuisine(response);
        console.log(response)
        
    }
        return(
            <div>
                <Type>{params.type}</Type>
        <Grid
        animate={{ opacity: 1 }}
        initial={{ opacity:0 }}
        exit={{ opacity:0 }}
        transition={{ duration: 0.5 }}
        >
            {
                        
                            cuisine.map((item) => {
                           return(
                            <Cart key={item._id}> 
                            <Link to={'/details/'+item.shortName}>
                            <img alt={item.name} src={`http://localhost:3000/foods/covers/${cuisine.covers["0"]}`} />
                            <h4>{item.name }</h4>
                            <h5>{item.price} تومان</h5>
                            </Link>
                            </Cart>
                           )
                        })
            }
            
        </Grid>
        </div>
        );
}
const Grid = styled(motion.div)`
display: grid;
  grid-template-columns: repeat(auto-fit ,minmax(20rem , 1fr));
  grid-gap: 3rem;
`;
const Type = styled.h3`
text-align:right;
`

export default Cuisine;