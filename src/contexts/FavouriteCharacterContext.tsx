import { ReactNode, createContext, useState } from 'react';
import { TMarvelCharacter } from '../types/MarvelAPI';

export type TFavouriteCharacter = {
  favouriteCharacters: Array<TMarvelCharacter>;
  checkIsFavouriteCharacter: (id: TMarvelCharacter['id']) => boolean;
  toggleFavouriteCharacter: (character: TMarvelCharacter) => void;
};

export const FavouriteCharacterContext = createContext<TFavouriteCharacter | undefined>(undefined);

export function FavouriteCharacterProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favouriteCharacters, setFavouriteCharacters] = useState<Array<TMarvelCharacter>>([]);

  function checkIsFavouriteCharacter(id: TMarvelCharacter['id']) {
    const characterIndex = favouriteCharacters.findIndex(c => c.id === id);
    return characterIndex !== -1;
  }

  function toggleFavouriteCharacter(character: TMarvelCharacter) {
    const characterIndex = favouriteCharacters.findIndex(c => c.id === character.id);
    if (characterIndex !== -1) {
      setFavouriteCharacters((prevState) => {
        const cloneState = [...prevState];
        cloneState.splice(characterIndex, 1);
        return cloneState.sort((a, b) => a.name.localeCompare(b.name));
      });
    } else {
      setFavouriteCharacters((prevState) => {
        return [...prevState, character].sort((a, b) => a.name.localeCompare(b.name));
      });
    }
  }

  const data = {
    favouriteCharacters,
    checkIsFavouriteCharacter,
    toggleFavouriteCharacter,
  }

  return <FavouriteCharacterContext.Provider value={data}>{children}</FavouriteCharacterContext.Provider>
}
