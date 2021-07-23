import './App.css';
import React, { useState, useEffect } from 'react';
import { Container, Button, Col, Row } from 'react-bootstrap'
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
      matchingTraits.push(cranium.reduce((accumulator, currentValue, j) => accumulator + (currentValue.value === craniums[i][j].value), 0));
    }
    let numMatchingTraits = 5;
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
    <img src={process.env.PUBLIC_URL + '/craniums/' + lookalike + '.png'} style={{width: '250px', height: 'auto'}} alt="Loading"></img>
  )

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <h1>Find your Wicked Cranium's Look-alikes!</h1>
            <input type="number" placeholder="Cranium ID" value={tokenId} onChange={(event) => {setTokenId(event.target.value)}}></input>
            <div>
              {tokenId && <img src={process.env.PUBLIC_URL + '/craniums/' + tokenId + '.png'} style={{width: '400px', height: 'auto'}} alt="Loading"></img>}
            </div>
            <h3>Look a Likes:</h3>
            {lookalikesHtml}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
