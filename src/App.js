import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]
const frickedCardImages = [
  {"src": "/imgFricked/moron-1.jpg", matched: false},
  {"src": "/imgFricked/moron-2.jpg", matched: false},
  {"src": "/imgFricked/dumbass-1.jpg", matched: false},
  {"src": "/imgFricked/frick-1.jpg", matched: false},
  {"src": "/imgFricked/dumbass-2.jpg", matched: false},
  {"src": "/imgFricked/moron-3.jpg", matched: false}
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  
  // shuffle fricked cards
  const shuffleFrikedCards = () => {
    const shuffledFrickedCards = [...frickedCardImages, ...frickedCardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(shuffledFrickedCards);
      setTurns(0)
  }
  

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null);
      setChoiceTwo(null);
      setCards(shuffledCards);
      setTurns(0)
  };
  // handle a choise
  const handleChoise = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // reset choise & increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }
  
  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => {
          resetTurn()
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo])
  
  // automaticly start new game
  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <div className="App">
      <h1>Игра: Найди пару</h1>
      <div className='buttons-block'>
        <button onClick={shuffleCards}>Новая игра</button>
        <button onClick={() => {
          alert("Ну, ты сам это выбрал...")
          shuffleFrikedCards()}}>Fricked mode</button>
      </div>
      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoise={handleChoise}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
          ))}
      </div>
      <p>Ходы: {turns}</p>
    </div>
  );
}

export default App;
