import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Test', () => {
  it('should pass', () => {
    expect(true).toBe(true);
  });
  it('should render', () => {
    render(<Button />);
  });
});
