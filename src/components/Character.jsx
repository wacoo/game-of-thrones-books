import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Character.css';
import { v4 as uuidv4 } from 'uuid';

const Character = () => {
  const dispatch = useDispatch();
  const selectedBook = useSelector(
    (state) => state.books.selectedBook,
  );

  const characters = selectedBook.characterData;

  useEffect(() => {
    // Add any necessary logic or side effects related to the selectedBook here
  }, [selectedBook]);

  return (
    <div className="container">
      <div className="character-main">
        <a href="/">
          <i className="fa fa-arrow-circle-left" />
        </a>
        <div>
          <h2>{selectedBook.name}</h2>
          {/* <img src={selectedCountry.map} alt="" /> */}
        </div>
      </div>
      <div className="character-sub">
        {characters && characters.length > 0 ? (
          characters.map((character) => {
            const uuid = uuidv4();
            const {
              name, gender, born, died, aliases, titles
            } = character;
            return (
              <div className="cell-detail" key={uuid}>
                <h2>{name}</h2>
                <div className="data">
                  <span>{`Gender: ${gender}`}</span>
                  <br />
                  <span>{`Born: ${born}`}</span>
                  <br />
                  <span>{`Died: ${died}`}</span>
                  <br />
                  <span>{`Alias: ${aliases[0] ? aliases[0] : ''}`}</span>
                  <br />
                  <span>{`Title: ${titles[0]}`}</span>
                </div>
              </div>
            );
          })
        ) : (
          <p>No character data available</p>
        )}
      </div>
    </div>
  );
};

export default Character;