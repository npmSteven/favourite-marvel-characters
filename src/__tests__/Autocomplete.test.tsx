import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Autocomplete } from '../components/Autocomplete';

describe('Autocomplete Component', () => {
  const label = "Test Label";
  const placeholder = "Test Placeholder";
  const items = [<div key="1">Item 1</div>, <div key="2">Item 2</div>];
  const setValue = vi.fn();
  const onSubmit = vi.fn();
  
  it('renders the component correctly', () => {
    render(
      <Autocomplete
        label={label}
        placeholder={placeholder}
        value=""
        setValue={setValue}
        onSubmit={onSubmit}
        isLoading={false}
        items={items}
      />
    );
    
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });
  
  it('handles focus and blur events', () => {
    render(
      <Autocomplete
        label={label}
        placeholder={placeholder}
        value=""
        setValue={setValue}
        onSubmit={onSubmit}
        isLoading={false}
        items={items}
      />
    );
    
    const input = screen.getByPlaceholderText(placeholder);
    
    fireEvent.focus(input);
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    
    fireEvent.blur(input);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  
  it('updates input value correctly', () => {
    render(
      <Autocomplete
        label={label}
        placeholder={placeholder}
        value=""
        setValue={setValue}
        onSubmit={onSubmit}
        isLoading={false}
        items={items}
      />
    );
    
    const input = screen.getByPlaceholderText(placeholder);
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(setValue).toHaveBeenCalledWith('test');
  });
  
  it('handles submit button click', () => {
    render(
      <Autocomplete
        label={label}
        placeholder={placeholder}
        value=""
        setValue={setValue}
        onSubmit={onSubmit}
        isLoading={false}
        items={items}
      />
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(onSubmit).toHaveBeenCalled();
  });
  
  it('displays loading state correctly', () => {
    render(
      <Autocomplete
        label={label}
        placeholder={placeholder}
        value=""
        setValue={setValue}
        onSubmit={onSubmit}
        isLoading={true}
        items={null}
      />
    );
    
    fireEvent.focus(screen.getByPlaceholderText(placeholder));
    expect(screen.getByAltText('loading')).toBeInTheDocument();
  });

  it('displays no matches found message', () => {
    render(
      <Autocomplete
        label={label}
        placeholder={placeholder}
        value=""
        setValue={setValue}
        onSubmit={onSubmit}
        isLoading={false}
        items={[]}
      />
    );
    
    fireEvent.focus(screen.getByPlaceholderText(placeholder));
    expect(screen.getByText('No matches found!')).toBeInTheDocument();
  });

  it('displays items correctly when not loading and items are provided', () => {
    render(
      <Autocomplete
        label={label}
        placeholder={placeholder}
        value=""
        setValue={setValue}
        onSubmit={onSubmit}
        isLoading={false}
        items={items}
      />
    );

    fireEvent.focus(screen.getByPlaceholderText(placeholder));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
