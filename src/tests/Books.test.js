import { BrowserRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { useDispatch, useSelector } from 'react-redux';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';
import Character from '../components/Character';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

const fakeData = {
  books: [
    {
      name: 'A Game of Thrones',
      authors: ['George R.R Martin'],
      characterData: [
        {          
          name: 'Walder',
          gender: 'Male'
        }
      ]
    },
    {
      name: 'A Clash of Kings',
      authors: ['George R.R Martin'],
      characterData: [
        {          
          name: 'Walder',
          gender: 'Male'
        }
      ]
    },
  ],
};

describe('Test components render', () => {
  it('Tests Home', () => {
    useDispatch();
    useSelector.mockReturnValue(fakeData.books);
    const homeComponent = renderer.create(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );
    expect(homeComponent).toMatchSnapshot();
  });

  it('Tests Character', () => {
    useDispatch();
    useSelector.mockReturnValue(fakeData.books[0].characterData[0]);
    const homeComponent = renderer.create(
      <BrowserRouter>
        <Character />
      </BrowserRouter>,
    );
    expect(homeComponent).toMatchSnapshot();
  });
});

describe('Test existance of elements in components', () => {
  it('Tests existance of the button "A Clash of Kings" in Home ', () => {
    useDispatch();
    useSelector.mockReturnValue(fakeData.books);
    render(<Home />);
    const h2 = screen.getByText('A Clash of Kings');
    expect(h2).toBeInTheDocument();
  });
  it('Tests existance of "Walder" entry in Characters page ', () => {
    useDispatch();
    useSelector.mockReturnValue(fakeData.books[0].characterData[0]);
    render(<Character />);
    const h2 = screen.getByText('Walder');
    expect(h2).toBeInTheDocument();
  });
});
