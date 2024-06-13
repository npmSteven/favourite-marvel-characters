import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { App } from '../App'; // Adjust the import according to your file structure
import { FavouriteCharacterContext } from '../contexts/FavouriteCharacterContext';

describe('App Component', () => {
  const contextValue = {
    favouriteCharacters: [],
    checkIsFavouriteCharacter: vi.fn(),
    toggleFavouriteCharacter: vi.fn(),
  };

  const getMarvelCharactersSearch = vi.fn();

  beforeEach(() => {
    getMarvelCharactersSearch.mockClear();
  });

  it('renders the component correctly', () => {
    render(
      <FavouriteCharacterContext.Provider value={contextValue}>
        <App />
      </FavouriteCharacterContext.Provider>
    );

    expect(screen.getByPlaceholderText('Doctor Octopus (Otto Octavius)')).toBeInTheDocument();
  });

  it('handles empty search result', async () => {
    getMarvelCharactersSearch.mockResolvedValue([]);

    render(
      <FavouriteCharacterContext.Provider value={contextValue}>
        <App />
      </FavouriteCharacterContext.Provider>
    );

    fireEvent.change(screen.getByPlaceholderText('Doctor Octopus (Otto Octavius)'), { target: { value: 'unknown' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(screen.getByText('No matches found!')).toBeInTheDocument();
    });
  });

});
