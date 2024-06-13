import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { CharacterSearchItem } from '../App'; // Adjust the import according to your file structure
import { FavouriteCharacterContext } from '../contexts/FavouriteCharacterContext';

// Mock character data
const character = {
  id: 1,
  name: 'Spider-Man',
  thumbnail: { path: 'http://example.com/spiderman', extension: 'jpg' },
};

describe('CharacterSearchItem Component', () => {
  const contextValue = {
    favouriteCharacters: [],
    checkIsFavouriteCharacter: vi.fn().mockReturnValue(true),
    toggleFavouriteCharacter: vi.fn(),
  };

  it('renders the component correctly', () => {
    render(
      <FavouriteCharacterContext.Provider value={contextValue}>
        <CharacterSearchItem character={character} text={character.name} src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`} />
      </FavouriteCharacterContext.Provider>
    );

    expect(screen.getByText(character.name)).toBeInTheDocument();
    expect(screen.getByAltText(character.name)).toBeInTheDocument();
  });

  it('handles image loading state', () => {
    render(
      <FavouriteCharacterContext.Provider value={contextValue}>
        <CharacterSearchItem character={character} text={character.name} src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`} />
      </FavouriteCharacterContext.Provider>
    );

    expect(screen.getByText(character.name)).toBeInTheDocument();
  });

  it('toggles favourite character on button click', () => {
    render(
      <FavouriteCharacterContext.Provider value={contextValue}>
        <CharacterSearchItem character={character} text={character.name} src={`${character.thumbnail.path}/standard_medium.${character.thumbnail.extension}`} />
      </FavouriteCharacterContext.Provider>
    );

    fireEvent.click(screen.getByRole('button'));
    expect(contextValue.toggleFavouriteCharacter).toHaveBeenCalledWith(character);
  });
});
