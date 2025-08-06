import * as d3 from 'd3'

export async function loadCSVData(url: string) {
  try {
    const data = await d3.csv(url)
    return data
  } catch (error) {
    console.error('Error loading CSV data:', error)
    return null
  }
}

// Add other utility functions as needed