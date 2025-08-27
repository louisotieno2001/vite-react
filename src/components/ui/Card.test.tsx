import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { Card, CardHeader, CardTitle, CardContent } from './Card';

describe('Card Component', () => {
  test('renders children correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Test content</p>
        </CardContent>
      </Card>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('applies custom className', () => {
    render(<Card className="custom-class">Content</Card>);
    const cardElement = screen.getByText('Content').parentElement;
    expect(cardElement).toHaveClass('custom-class');
  });
});
