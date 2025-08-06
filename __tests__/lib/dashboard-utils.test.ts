import { loadCSVData } from '@/app/lib/dashboard-utils'
import * as d3 from 'd3'

// Mock d3.csv function
jest.mock('d3', () => ({
  csv: jest.fn(),
}))

const mockedD3 = d3 as jest.Mocked<typeof d3>

describe('Dashboard Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock console.error to avoid noise in tests
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('loadCSVData', () => {
    it('should load CSV data successfully', async () => {
      const mockData = [
        { name: 'Plant 1', capacity: '100' },
        { name: 'Plant 2', capacity: '200' },
      ]
      
      mockedD3.csv.mockResolvedValue(mockData as any)

      const result = await loadCSVData('test-url.csv')

      expect(mockedD3.csv).toHaveBeenCalledWith('test-url.csv')
      expect(result).toEqual(mockData)
    })

    it('should handle CSV loading errors gracefully', async () => {
      const errorMessage = 'Network error'
      mockedD3.csv.mockRejectedValue(new Error(errorMessage))

      const result = await loadCSVData('invalid-url.csv')

      expect(mockedD3.csv).toHaveBeenCalledWith('invalid-url.csv')
      expect(result).toBeNull()
      expect(console.error).toHaveBeenCalledWith('Error loading CSV data:', new Error(errorMessage))
    })

    it('should handle empty URLs', async () => {
      mockedD3.csv.mockResolvedValue([] as any)

      const result = await loadCSVData('')

      expect(mockedD3.csv).toHaveBeenCalledWith('')
      expect(result).toEqual([])
    })

    it('should return null on network failures', async () => {
      mockedD3.csv.mockRejectedValue(new TypeError('Failed to fetch'))

      const result = await loadCSVData('https://example.com/data.csv')

      expect(result).toBeNull()
      expect(console.error).toHaveBeenCalled()
    })

    it('should handle malformed CSV data', async () => {
      const malformedData = [
        { '': 'invalid', '1': 'data' },
        { '2': 'more', '3': 'invalid' },
      ]
      
      mockedD3.csv.mockResolvedValue(malformedData as any)

      const result = await loadCSVData('malformed.csv')

      expect(result).toEqual(malformedData)
    })
  })
})