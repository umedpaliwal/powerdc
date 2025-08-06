import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '@/app/components/header'

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(<Header />)
  })

  it('displays both logo images', () => {
    render(<Header />)
    
    const gridLabLogo = screen.getByAltText('GridLab Logo')
    const ucbLogo = screen.getByAltText('UCB Logo')
    
    expect(gridLabLogo).toBeInTheDocument()
    expect(ucbLogo).toBeInTheDocument()
  })

  it('has correct logo image sources', () => {
    render(<Header />)
    
    const gridLabLogo = screen.getByAltText('GridLab Logo')
    const ucbLogo = screen.getByAltText('UCB Logo')
    
    expect(gridLabLogo).toHaveAttribute('src', '/gridlab_logo.png')
    expect(ucbLogo).toHaveAttribute('src', '/ucb_logo.png')
  })

  it('has proper positioning styles', () => {
    const { container } = render(<Header />)
    const headerBox = container.firstChild as HTMLElement
    
    // Check if the header container has the expected styles
    expect(headerBox).toHaveStyle({
      position: 'absolute',
      zIndex: '1000',
    })
  })

  it('maintains responsive layout structure', () => {
    render(<Header />)
    
    // Both logos should be present regardless of screen size
    expect(screen.getByAltText('GridLab Logo')).toBeInTheDocument()
    expect(screen.getByAltText('UCB Logo')).toBeInTheDocument()
  })
})