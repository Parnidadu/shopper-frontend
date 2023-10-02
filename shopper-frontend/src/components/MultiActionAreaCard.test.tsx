import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MultiActionAreaCard from './ActionCard'; 

test('renders shop name and bio', () => {
  const shop = {
    _id: '1',
    name: 'Sample Shop',
    bio: 'Sample Shop Bio',
  };

  render(<MultiActionAreaCard shop={shop} />);

  const shopName = screen.getByText(/Sample Shop/i);
  const shopBio = screen.getByText(/Sample Shop Bio/i);

  expect(shopName).toBeInTheDocument();
  expect(shopBio).toBeInTheDocument();
});

test('renders link to shop details', () => {
  const shop = {
    _id: '1',
    name: 'Sample Shop',
    bio: 'Sample Shop Bio',
  };

  render(<MultiActionAreaCard shop={shop} />);

  const shopLink = screen.getByRole('link', { name: /Sample Shop/i });

  expect(shopLink).toHaveAttribute('href', '/shop/1');
});
