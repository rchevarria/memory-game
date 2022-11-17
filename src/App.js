import './App.css';
import { useState, useEffect } from 'react'
import Card from './Card'

const cardImages = [
    {"src": "img/tnt.png", matched: false},         //path to images
    {"src": "img/furnace.png", matched: false},
    {"src": "img/creeper.png", matched: false},
    {"src": "img/sword.png", matched: false},
    {"src": "img/craft.png", matched: false},
    {"src": "img/steve.png", matched: false},
    {"src": "img/pig.png", matched: false},
    {"src": "img/zombie.png", matched: false}
]

function App() {
    
    const [cards, setCards] = useState([])
    const [turns, setTurns] = useState(0)
    
    const [firstChoice, setChoiceOne] = useState(null)
    const [secondChoice, setChoiceTwo] = useState(null)
    const [disabled, setDisabled] = useState(false)
    
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
        firstChoice ? setChoiceTwo(card) : setChoiceOne(card)
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
                setTimeout(() => reset(), 1000)
            }
        }
    }, [firstChoice, secondChoice])
    
    console.log(cards)
    
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
           
           <div className="card-grid">
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
