import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import RenderSmoothImage from './RenderSmoothImage'
const craniums = require('./cranium_array.json');

function App() {

  const [tokenId, setTokenId] = useState(Math.floor(Math.random() * 10762));
  const [lookalikes, setLookalikes] = useState([]);
  const [mainImageLoaded, setMainImageLoaded] = useState(false);

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
    setMainImageLoaded(false);
  }, [tokenId])

  const lookalikesHtml = lookalikes.map((lookalike) =>
    <RenderSmoothImage key={lookalike} src={process.env.PUBLIC_URL + '/craniums/' + lookalike + '.png'} alt={lookalike} title={lookalike}></RenderSmoothImage>
  )

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <div id="cranium-selector" className="mt-2">
              {/* Main cranium image */}
              <div>
                {tokenId &&
                  <img className="me-3"
                    id="main-cranium"
                    src={process.env.PUBLIC_URL + '/craniums/' + tokenId + '.png'}
                    alt={tokenId}
                    onLoad={() => setMainImageLoaded(true)}>
                  </img>}
              </div>
              {/* Header and input to select token id */}
              <div>
                <h2 style={{color: "white"}}><strong>All craniums are unique, but some are wickedly similar...</strong></h2>
                <label htmlFor="tokenIdInput" style={{color: "white"}}>Token ID:&nbsp;</label>
                <input id="tokenIdInput" type="number" placeholder="Cranium ID" value={tokenId} onChange={(event) => { setTokenId(Math.min(event.target.value, 10761))}}></input>
              </div>
            </div>
            {/* The look alikes */}
            <div>
              <br></br>
              {mainImageLoaded && lookalikesHtml}
            </div>
            <br></br><br></br>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
