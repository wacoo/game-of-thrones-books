import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://anapioficeandfire.com/api/books';

const fetchCharacterData = async (characterUrl) => {
  const res = await axios.get(characterUrl);
  return res.data;
};

const fetchBooks = createAsyncThunk('Song/books', async () => {
  try {
    const res = await axios.get(url);
    const books = res.data;

    const characterDataPromises = books.flatMap((book) => (
      book.characters.slice(0, 25).map((characterUrl) => fetchCharacterData(characterUrl))
    ));

    const characterDataList = await Promise.all(characterDataPromises);

    let characterDataIndex = 0;

    const booksWithCharacterData = books.map((book) => {
      const characters = book.characters.slice(0, 25).map(() => {
        const characterData = characterDataList[characterDataIndex];
        characterDataIndex += 1;
        return characterData;
      });

      return {
        ...book,
        characterData: characters,
      };
    });

    return booksWithCharacterData;
  } catch (error) {
    console.error(`Error fetching books: ${error}`);
    throw error;
  }
});

const initialState = {
  isLoading: false,
  books: [],
  selectedBook: {},
  tempHolder: [],
  error: undefined,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setSelected: (state, action) => {
      state.selectedBook = action.payload;
    },
    getFiltered: (state, action) => {
      if (state.tempHolder.length === 0) {
        state.tempHolder = state.books;
      }

      if (action.payload.length === 0) {
        state.books = state.tempHolder;
      }
      state.books = state.books.filter((book) => (
        book.name.startsWith(action.payload)));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default booksSlice.reducer;
export { fetchBooks };
export const { getFiltered, setSelected } = booksSlice.actions;
