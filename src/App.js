import React, { Component } from 'react';
import Header from './components/Header/Header.js';
import './App.css';
import Card from "./components/Card/Card";
import Footer from "./components/Footer/Footer";
import Friends from "./friends.json";

//Variables for page loading
let score = 0;
let topScore = 0;
let message ="Click image to begin";

class App extends Component {
  //setting state
  state = {
    Friends,
    score,
    topScore,
    message
  }

  setClicked = id => {
    const Friends = this.state.Friends;
   const clickedMatch = Friends.filter(match => match.id === id);

   if (clickedMatch[0].clicked) {
     score = 0;

     message = "sorry! image clicked on already!";
     for (let i = 0; i < Friends.length; i++) {
       Friends[i].clicked = false;
     }
     //setting new values
     this.setState({message});
     this.setState({score});
     this.setState({Friends});

   } else if (score < 11) {
     clickedMatch[0].clicked = true;

    //scores
     score++;
     //Will update message
     message = "Correct! Keep playing!";

     if (score > topScore) {
       topScore = score;
       this.setState({topScore});
     }
     //setting random image
     Friends.sort(function (a, b) {return 0.5 - Math.random()});
     this.setState({Friends});
     this.setState({score});
     this.setState({message});

   } else {
     clickedMatch[0].clicked = true;
     score = 0;
     topScore = 12;

     message = "Great job";

     this.setState({topScore});
     for (let i = 0; i < Friends.length; i++) {
      Friends[i].clicked = false;

   }

   //returns image
   Friends.sort(function (a, b) {return 0.5 - Math.random})
   this.setState({Friends});
   this.setState({score});
   this.setState({message});
  }
}

render() {
  return (
    <div>
      <Header message={this.state.message} score={this.state.score} topscore = {this.state.topscore} />
      <div className='cardArea'>
          {this.state.Friends.map(char => (
            <Card
                setClicked={this.setClicked}
                id={char.id}
                key={char.id}
                name={char.name}
                image={char.image}
                />
          ))}

      </div>

      <Footer/>

    </div>
  );
}
}

export default App;