import { render, screen } from '@testing-library/react';
import App from './App';

test('renders intro headline', () => {
  render(<App />);
  expect(
    screen.getByText(/Laiba, are you ready to fight PCOS/i)
  ).toBeInTheDocument();
});
