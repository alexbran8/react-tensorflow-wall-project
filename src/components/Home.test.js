import React from 'react'
import { render, screen, act, fireEvent } from '@testing-library/react'
import Home from './Home'

test('renders a title', () => {
  const { getByText } = render(<Home />)
  const title = "This application works in desktop mode"
  expect(getByText(title)).toBeInTheDocument()
})

test('renders a responsive title', () => {
  const { rerender, container } = render(<Home />)
  let title = "Start Detect"
  expect(container).toHaveTextContent(title)
  act(() => {
    window.innerWidth = 100
    fireEvent(window, new Event('resize'))
  })
  rerender(<Home />)
  expect(screen.getByText('Start Detect')).toBeVisible()
})