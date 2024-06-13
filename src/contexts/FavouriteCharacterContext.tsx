import { ReactNode, createContext, useState } from 'react';

export const FavouriteCharacterContext = createContext([]);

export function FavouriteCharacterProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [favouriteCharacters, setFavouriteCharacters] = useState([]);

  function checkIsFavouriteCharacter(id: string) {
    const characterIndex = favouriteCharacters.findIndex(c => c.id === id);
    return characterIndex !== -1;
  }

  function toggleFavouriteCharacter(character) {
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
