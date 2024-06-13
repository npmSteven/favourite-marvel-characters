import React, { ChangeEvent, useMemo, useState, useRef } from 'react';
import MarvelSVG from '../assets/marvel.svg';

export function Autocomplete({
  label,
  isLoading,
  value,
  setValue,
  onSubmit,
  items,
  placeholder,
}: {
  label: string;
  value: string;
  placeholder: string;
  setValue: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  items: Array<React.ReactNode> | null;
}) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e: React.FocusEvent) => {
    if (
      e.relatedTarget === inputRef.current ||
      e.relatedTarget === listRef.current ||
      e.relatedTarget === buttonRef.current ||
      listRef.current?.contains(e.relatedTarget as Node) ||
      buttonRef.current?.contains(e.relatedTarget as Node)
    ) {
      return;
    }
    setIsFocused(false);
  };

  const handleClick = () => {
    buttonRef.current?.focus();
    onSubmit();
  };

  const isEmpty = useMemo(
    () => items?.length === 0 || items === null,
    [items]
  );

  return (
    <div className='flex items-start'>
      <div className="w-[450px] relative">
        <span className="uppercase">{label}</span>
        <div className="border border-gray-300 px-3 h-[45px]">
          <input
            type="text"
            className="w-full focus-visible:outline-none h-full"
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            ref={inputRef}
            value={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
          />
        </div>
        {isFocused && (items || isLoading) && (
          <div
            className="h-[500px] w-full overflow-scroll absolute bg-white z-50"
            tabIndex={1}
            ref={listRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
          >
            {isLoading && (
              <div className="flex justify-center items-center h-full animate-pulse">
                <img src={MarvelSVG} />
              </div>
            )}
            {isEmpty && <div className="text-center">No matches found!</div>}
            {!isLoading && !isEmpty && (
              <div className="flex flex-col">{items}</div>
            )}
          </div>
        )}
      </div>
      <div
        role='button'
        tabIndex={0}
        ref={buttonRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleClick}
        className="bg-marvel-red uppercase border px-6 py-[10.5px] text-white mt-[23px] ml-[-1px] disabled:opacity-20"
      >Search</div>
    </div>
  );
}
