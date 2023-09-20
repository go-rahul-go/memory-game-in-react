import "./style.css"
import images from "./Images";
import { useState } from "react";
import {  shuffle } from "lodash";
function App() {
    const [cards, setCards] = useState(shuffle([...images, ...images]));
    const [activeCards,setActiveCard]=useState([]);
    const [gameOver,setGameOver]=useState(false)
    const [foundpairs,setfoundPairs]=useState([])
    const [clicks,setClicks]=useState(0)
    function flip(index) {
        if(gameOver)
        {
            setCards(shuffle([...images,...images]))
            setfoundPairs([])
            setGameOver(false)
            setClicks(0)
        }
        if(activeCards.length===0)
        {
            setActiveCard([index])
        }
        if(activeCards.length===1)
        {
            let firstIndex=activeCards[0]
            let secondIndex=index;
            if(cards[firstIndex]===cards[secondIndex])
            {
                setfoundPairs([...foundpairs,firstIndex,secondIndex])
            }
            if(foundpairs.length + 2 === cards.length)
            {
                setGameOver(true)
            }
            setActiveCard([...activeCards,index])
        }
        if(activeCards.length===2)
        {
            
            setActiveCard([index])
        }
        setClicks(clicks+1)
    }
    return (
        <div>
            <div className="data">
                {
                    gameOver&&<p>you won the game!</p>
                }
                Clicks: {clicks}, found pairs: {(foundpairs.length)/2}
            </div>
            <div className="board">
                {
                    cards.map((card, index) => {
                        const flippedTofront=(activeCards.indexOf(index)!==-1) || foundpairs.indexOf(index)!==-1;
                    return (
                        <div className={"card-outer " +(flippedTofront?"flipped":"")} key={index} onClick={()=>flip(index)}>
                                <div className="card">
                                    <div className="front">
                                        <img src={card} alt="meme" />
                                    </div>
                                    <div className="back">
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }


            </div>
            
            
        </div>
    )
}

export default App;
