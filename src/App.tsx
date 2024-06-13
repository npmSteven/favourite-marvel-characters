import React, { useContext, useState } from "react";
import classNames from "classnames";
import { Autocomplete } from "./components/Autocomplete";
import { FavouriteCharacterContext } from "./contexts/FavouriteCharacterContext";
import MarvelSVG from './assets/marvel.svg';
import { TMarvelCharacter } from "./types/MarvelAPI";

export function CharacterSearchItem({ character, text, src }: { character: any, text: string; src: string}) {
  const context = useContext(FavouriteCharacterContext);

  if (!context) {
    throw new Error('FavouriteCharacterContext must be used within a FavouriteCharacterProvider');
  }

  const { checkIsFavouriteCharacter, toggleFavouriteCharacter } = context;

  const btnClass = classNames({
    'bg-marvel-red text-white': checkIsFavouriteCharacter(character.id)
  });

  const [isImageLoading, setIsImageLoading] = useState(true);
  return (
    <button className={`flex h-[90px] hover:opacity-80 relative ${btnClass}`} onClick={() => toggleFavouriteCharacter(character)}>
      <img src={src} className="w-[90px] h-full" onLoad={() => setIsImageLoading(false)} alt={character.name} />
      {/* Implement a better loading image in the future */}
      {isImageLoading && (
        <div className="absolute bg-gray-200 animate-pulse w-[90px] h-[90px] flex justify-center items-center"></div>
      )}
      <span className="w-4/5 mx-0 my-auto font-medium">
        {text}
      </span>
    </button>
  )
}

// Future improvement add TTL to cache
const cache: {
  [v: string]: TMarvelCharacter[];
} = {};

// Add type for the results of the api call
export async function getMarvelCharactersSearch(value: string): Promise<Array<TMarvelCharacter>> {
  try {
    if (cache[value]) {
      return cache[value];
    }

    const url = new URL(`${import.meta.env.VITE_API_URL}/characters`);
    url.searchParams.set('nameStartsWith', value);
    url.searchParams.set('orderBy', 'name');
    url.searchParams.set('limit', '100'); 
    url.searchParams.set('apikey', import.meta.env.VITE_API_KEY);
    const response = await fetch(url);
    const payload = await response.json();

    cache[value] = payload?.data?.results ?? [];

    return payload?.data?.results ?? [];
  } catch (e) {
    console.error('ERROR - getMarvelCharactersSearch():', e);
    throw e;
  }
}

/**
 * Improvements
 * 1. Extend the functionaliy to have an infinite loading
 * 2. Instead of having a button we could add a debounce to the input
 */
export function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [characterResults, setCharacterResults] = useState<Array<React.ReactNode> | null>(null);
  const context = useContext(FavouriteCharacterContext);

  if (!context) {
    throw new Error('FavouriteCharacterContext must be used within a FavouriteCharacterProvider');
  }

  const { favouriteCharacters, toggleFavouriteCharacter } = context;

  async function onSearch() {
    try {
      // Check if the input (value state) has text and is equal or greater than 2 characters
      if (!search || search?.length <= 1) {
        return;
      }
      setIsLoading(true);
      
      const characters = await getMarvelCharactersSearch(search);
       
      setCharacterResults(characters.map((c) => (
        <CharacterSearchItem key={c.id} character={c} text={c.name} src={`${c.thumbnail.path}/standard_medium.${c.thumbnail.extension}`} />
      )))
    } catch (e) {
      console.error('ERROR - onSearch():', e);
      // notify that we failed to search
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center text-white px-2 bg-marvel-black">
        <span>Favourite Marvel Characters</span>
        <img src={MarvelSVG} alt="Marvel Logo" />
        <span>By npmSteven</span>
      </div>
      <div className="flex flex-col items-center mt-10">
        <Autocomplete
          placeholder="Doctor Octopus (Otto Octavius)"
          label="Find your favourite marvel characters"
          value={search}
          setValue={setSearch}
          isLoading={isLoading}
          onSubmit={onSearch}
          items={characterResults}
        />
        {/* List of favourite characters */}
        <div>
          <h3 className="text-center text-4xl mt-5 font-bold">Your Favourite Marval Characters</h3>
          <ul className="flex flex-wrap justify-center border w-[80vw] my-5 h-[75vh] overflow-scroll">
            {favouriteCharacters?.map((c: TMarvelCharacter) => (
              <li
                onClick={() => toggleFavouriteCharacter(c)}
                key={c.id}
                className="mr-2 last-of-type:mr-0 my-2 relative bg-black h-[450px] w-[300px] cursor-pointer hover:bg-red-800"
              >
                <span className="absolute w-full text-center top-[200px] text-white font-bold text-3xl uppercase z-10">{c.name}</span>
                <img className="opacity-60" src={`${c.thumbnail.path}/portrait_uncanny.${c.thumbnail.extension}`} />
              </li>
            ))}
            {favouriteCharacters?.length === 0 && (
              <div className="my-10">You haven't favourited any characters yet, please use the above input to do so</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  ) 
}
