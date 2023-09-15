import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBooks, setSelected } from '../redux/books/booksSlice';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
// import BG from '../imgs/bg.png';

const Books = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.books[0]) ?? [
    {
      name: '',
      authors: [],
      isbn: '',
      numberOfPages: '',
      publisher: '',
      released: '',
    }
  ];

  useEffect(() => {
      dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    console.log(books);
  }, [books]);

  const bgImage = () => {
    const im = {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    };
    return im;
  };

  const handleClick = (book) => {
    dispatch(setSelected(book));
    navigate('/characters');
  };

  return books.map((book) => {
    <h1>{book.name}</h1>
    const uuid = uuidv4();
    return (
      <button type="button" className="cell" key={uuid} style={bgImage()} onClick={() => handleClick(book)}>
        <div className="inside-icon-wrapper">
          <i className="fa fa-arrow-circle-right" />
        </div>
        <div className="">
          <h2>{book.name}</h2>
          <div className="books">
          {`Author: ${book.authors[0]}`}
            <br />
            {`ISBN: ${book.isbn}`}
            <br />
            {`No. of Page: ${book.numberOfPages}`}
            <br />
            {`Publusher: ${book.publisher}`}
            <br />
            {`Release date: ${book.released}`}
          </div>
        </div>
      </button>
    );
  });
};

export default Books;
