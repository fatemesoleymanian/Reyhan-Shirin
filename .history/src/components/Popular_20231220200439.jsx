import { useEffect, useState } from "react";
import { Splide,SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import {Wrapper , Card , Gradiant} from '../style/styles'
import { Link } from "react-router-dom";
import styled from 'styled-components';

function Popular(){

    const [popular , setPopular] = useState([]);
    useEffect(() => {
        populars();

    },[]) 
    const populars = async () =>{
        const check = localStorage.getItem('popular');
        if(check){
            return setPopular(JSON.parse(check));
        }
        else{
        const api = await fetch('http://localhost:3000/v1/food/all');
        const response = await api.json();
        
        setPopular(response.data);
        localStorage.setItem('popular',JSON.stringify(response.recipes));
        }
    }
    return(
        <div>
                <Wrapper >
                    <h3> محبوب ترین ها</h3>
                    <StyledSplide options={{perPage:3,drag:'free', arrows: false ,
                     pagination:false, gap:'2rem' }}>
                    {popular.map((recipe) =>{
                        return(
                            <SplideSlide key={recipe.id}>
                            <Card >
                                <Link to={'/details/'+recipe.id}>
                                <p>{recipe.title}</p>
                                <img alt={recipe.title} src={recipe.image} />
                                <Gradiant />
                                </Link>
                            </Card>
                            </SplideSlide> 
                        );
                    })}
                    </StyledSplide>
                </Wrapper>
        </div>
    );
}

const StyledSplide = styled(Splide)`
  /* Common styles for all screen sizes */

  /* Media query for screens with a maximum width of 600px (phones) */
  @media only screen and (max-width: 600px) {
    .splide__slide {
      width: 100% !important; /* Set slide width to 100% for smaller screens */
    }
  }
  /* Media query for tablets (601px to 900px) */
  @media only screen and (min-width: 601px) and (max-width: 900px) {
    .splide__slide {
      width: 60% !important; /* Set slide width to 50% for tablets */
    }
  }

`;
export default Popular;