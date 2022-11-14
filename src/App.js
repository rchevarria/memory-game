import './App.css';
import { useState } from 'react'
import Card from './Card'

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
    
    const [firstChoice, setChoiceOne] = useState(null)
    const [secondChoice, setChoiceTwo] = useState(null)
    
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
        .sort(() => Math.random() - 0.5)
        .map((card) => ({...card, id: Math.random() })) //shuffling cards and giving them an ID
        
        setCards(shuffledCards)
        setTurns(0)
    }
    
    //handling user choice
    
    const handleChoice = (card) => {
        console.log(card)
    }
  
    
    return(
        <div className="App">
             <h1> Minecraft Memory Game </h1>
             <start-button onClick={shuffleCards}> New Game </start-button>
           
           <div className="card-grid">
                {cards.map(card => (
                    <Card
                        key={card.id}
                        card={card}
                        handleChoice = {handleChoice}
                    />
            ))}
           </div>
           
        </div>
    );
}

export default App;
