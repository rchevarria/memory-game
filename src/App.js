import './App.css';
import { useState } from 'react'

const cardImages = [
    {"src": "img/tnt.png"},         //path to images
    {"src": "img/furnace.png"},
    {"src": "img/creeper.png"},
    {"src": "img/sword.png"},
    {"src": "img/craft.png"},
    {"src": "img/steve.png"}
]

function App() {
    
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random() })) //shuffling cards and giving them an ID
        
        setCards(shuffledCards)
        setTurns(0)
    }
    console.log(cards, turns)
    
  
    
    return(
           <div className="App">
             <h1> Minecraft Memory Game </h1>
           <start-button onClick={shuffleCards}> New Game </start-button>
           
           <div className="card-grid">
           {cards.map(card => (
                <div className="card" key= {card.id}>
                    <div>
                        <img className="front" src={card.src} alt="card front" />
                        <img className="back" src= "/img/cover.png" alt="card back" />
                    </div>
                </div>
                               
            ))}
           </div>
           
           </div>
    );
}

export default App;
