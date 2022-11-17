import './App.css';
import { useState, useEffect } from 'react'
import Card from './Card'

const cardImages = [
    {"src": "img/tnt.png", matched: false},     // tnt
    {"src": "img/furnace.png", matched: false}, // furnace
    {"src": "img/creeper.png", matched: false}, // creeper
    {"src": "img/sword.png", matched: false},   // sword
    {"src": "img/craft.png", matched: false},   // craft
    {"src": "img/steve.png", matched: false},   // steve
    {"src": "img/pig.png", matched: false},     // pig
    {"src": "img/zombie.png", matched: false}   // zombie
]

function App() {
    
    const [cards, setCards] = useState([])
    const [firstChoice, setChoiceOne] = useState(null)
    const [secondChoice, setChoiceTwo] = useState(null)
    
    
    const [disabled, setDisabled] = useState(false)
    const [turns, setTurns] = useState(0)
    
    const shuffleCards = () => {
        const shuffledCards = [...cardImages, ...cardImages]
            .sort(() => Math.random() - 0.5)
            .map((card) => ({...card, id: Math.random() })) //shuffling cards and giving them an ID
        
        setChoiceOne(null)
        setChoiceTwo(null)
        setCards(shuffledCards)
        setTurns(0)
    }
    
    //handling user choice
    
    const handleChoice = (card) => {
        if(firstChoice == null){
            setChoiceOne(card)
        }
        else{
            setChoiceTwo(card)
        }
    }

    //Compare the selected cards
    
    useEffect(() => {
        if(firstChoice && secondChoice){
            setDisabled(true)
            if(firstChoice.src === secondChoice.src){
                setCards(prevCards => {
                    return prevCards.map(card => {
                        if(card.src == firstChoice.src){
                            return {...card, matched: true}
                        }else{
                            return card
                        }
                    })
                })
                reset()
            }
            else{
                setTimeout(() => reset(), 900)
            }
        }
    }, [firstChoice, secondChoice])
    
    
    //reset choices and increases turns
    const reset = () => {
        setChoiceOne(null)
        setChoiceTwo(null)
        setDisabled(false)
        setTurns(prevTurns => prevTurns + 1)
    }
  
    useEffect(() => {
        shuffleCards()
    }, [])
    
    return(
        <div className="App">
             <h1> Minecraft Memory Game </h1>
             <start-button onClick={shuffleCards}> New Game </start-button>
              <h5> Moves: {turns} </h5>
           
           <div className="grid">
                {cards.map(card => (
                    <Card
                        key={card.id}
                        card={card}
                        handleChoice = {handleChoice}
                        flipped={card === firstChoice || card === secondChoice ||card.matched}
                        disabled = {disabled}
                    />
            ))}
           </div>
        </div>
    );
}

export default App;
