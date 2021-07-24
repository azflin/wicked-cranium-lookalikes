import './App.css';
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap'
const craniums = require('./cranium_array.json');

function App() {

  const [tokenId, setTokenId] = useState(Math.floor(Math.random() * 10762));
  const [lookalikes, setLookalikes] = useState([]);

  function findLookAlikes(tokenId) {
    const cranium = craniums[tokenId];
    const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
    let bestMatches = [];
    let matchingTraits = [];
    for (let i=0; i<craniums.length; i++) {
      // Disregard the first attribute, which is background
      matchingTraits.push(cranium.slice(1,6).reduce((accumulator, currentValue, j) => accumulator + (currentValue.value === craniums[i][j+1].value), 0));
    }
    // At most 4 traits can match (5 traits would just be the same cranium)
    let numMatchingTraits = 4;
    while (bestMatches.length < 10) {
      bestMatches.push(...indexOfAll(matchingTraits, numMatchingTraits));
      numMatchingTraits -= 1;
    }
    setLookalikes(bestMatches.slice(0, 10));
  }

  useEffect(() => {
    if (tokenId) findLookAlikes(tokenId);
  }, [tokenId])

  const lookalikesHtml = lookalikes.map((lookalike) =>
    <img key={lookalike} className="cranium-image m-1" src={process.env.PUBLIC_URL + '/craniums/' + lookalike + '.png'} alt={lookalike}></img>
  )

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1>Find your Wicked Cranium's Look-alikes!</h1>
            <input type="number" placeholder="Cranium ID" value={tokenId} onChange={(event) => {setTokenId(event.target.value)}}></input>
            <div>
              {tokenId && <img id="main-cranium" src={process.env.PUBLIC_URL + '/craniums/' + tokenId + '.png'} alt={tokenId}></img>}
            </div>
            <h3>Look a Likes:</h3>
            {lookalikesHtml}
            <br></br><br></br>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
