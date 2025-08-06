import React from 'react'
import { render, screen } from '@testing-library/react'
import Header from '@/app/components/header'

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(<Header />)
  })

  it('displays company logo', () => {
    render(<Header />)
    
    const companyLogo = screen.getByAltText('Company Logo')
    
    expect(companyLogo).toBeInTheDocument()
  })

  it('has correct logo image source', () => {
    render(<Header />)
    
    const companyLogo = screen.getByAltText('Company Logo')
    
    expect(companyLogo).toHaveAttribute('src', '/logo.png')
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
    
    // Company logo should be present regardless of screen size
    expect(screen.getByAltText('Company Logo')).toBeInTheDocument()
  })
})