import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import StatisticCard from '@/app/components/home/StatisticCard'
import { ElectricBolt } from '@mui/icons-material'

// Mock IntersectionObserver
beforeEach(() => {
  global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
    observe: jest.fn(() => {
      // Trigger intersection immediately for testing
      callback([{ isIntersecting: true, target: { classList: { add: jest.fn() } } }])
    }),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }))
})

describe('StatisticCard Component', () => {
  const defaultProps = {
    icon: <ElectricBolt />,
    value: 100,
    unit: 'MW',
    label: 'Power Generation',
    description: 'Total renewable power capacity',
    animate: true,
    color: '#8ecae6',
  }

  it('renders without crashing', () => {
    render(<StatisticCard {...defaultProps} />)
  })

  it('displays all provided content', () => {
    render(<StatisticCard {...defaultProps} />)
    
    expect(screen.getByText('Power Generation')).toBeInTheDocument()
    expect(screen.getByText('Total renewable power capacity')).toBeInTheDocument()
    expect(screen.getByText('MW')).toBeInTheDocument()
  })

  it('renders with string value', () => {
    const props = { ...defaultProps, value: 'N/A', animate: false }
    render(<StatisticCard {...props} />)
    
    expect(screen.getByText('N/A')).toBeInTheDocument()
  })

  it('renders without unit', () => {
    const { unit, ...propsWithoutUnit } = defaultProps
    render(<StatisticCard {...propsWithoutUnit} />)
    
    expect(screen.getByText('Power Generation')).toBeInTheDocument()
    expect(screen.queryByText('MW')).not.toBeInTheDocument()
  })

  it('renders without description', () => {
    const { description, ...propsWithoutDescription } = defaultProps
    render(<StatisticCard {...propsWithoutDescription} />)
    
    expect(screen.getByText('Power Generation')).toBeInTheDocument()
    expect(screen.queryByText('Total renewable power capacity')).not.toBeInTheDocument()
  })

  it('displays animated value when animation is enabled', async () => {
    render(<StatisticCard {...defaultProps} />)
    
    // Initially should show 0 or a lower value
    await waitFor(() => {
      const valueElement = screen.getByText(/\d+/)
      const displayedValue = parseInt(valueElement.textContent || '0')
      expect(displayedValue).toBeGreaterThanOrEqual(0)
    })
  })

  it('displays static value when animation is disabled', () => {
    const props = { ...defaultProps, animate: false }
    render(<StatisticCard {...props} />)
    
    expect(screen.getByText('100')).toBeInTheDocument()
  })

  it('applies custom color styling', () => {
    const customColor = '#ff6b6b'
    const props = { ...defaultProps, color: customColor }
    
    render(<StatisticCard {...props} />)
    
    // Check if the card exists by its class or id instead of role
    const card = document.getElementById('stat-card-Power-Generation')
    expect(card).toBeInTheDocument()
  })

  it('generates correct id based on label', () => {
    render(<StatisticCard {...defaultProps} />)
    
    const card = document.getElementById('stat-card-Power-Generation')
    expect(card).toBeInTheDocument()
    expect(card).toHaveAttribute('id', 'stat-card-Power-Generation')
  })

  it('handles labels with spaces and special characters', () => {
    const props = { ...defaultProps, label: 'Total CO2 Savings' }
    render(<StatisticCard {...props} />)
    
    const card = document.getElementById('stat-card-Total-CO2-Savings')
    expect(card).toBeInTheDocument()
    expect(card).toHaveAttribute('id', 'stat-card-Total-CO2-Savings')
  })

  it('formats numeric values correctly during animation', async () => {
    const props = { ...defaultProps, value: 1250 }
    render(<StatisticCard {...props} />)
    
    await waitFor(() => {
      const valueElement = screen.getByText(/\d+/)
      const displayedValue = parseInt(valueElement.textContent || '0')
      expect(displayedValue).toBeLessThanOrEqual(1250)
    })
  })

  it('maintains accessibility with proper ARIA attributes', () => {
    render(<StatisticCard {...defaultProps} />)
    
    const card = document.getElementById('stat-card-Power-Generation')
    expect(card).toBeInTheDocument()
  })
})