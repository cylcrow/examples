import React from 'react'
import { findAllByRole, render } from '@testing-library/react'
import FindBy from './FindBy'
import { imagesMockData } from './mockData'

const build = (props) => {
  const { container } = render(<FindBy {...props} />)
  return {
    container,
    images: () => findAllByRole(container, 'img'),
    nonExistentImages: () => findAllByRole(container, 'img'),
  }
}

describe('FindBy', () => {
  it('renders', () => {
    build()
  })

  // Here, we must await until the query returns or throws
  it('renders images list', async () => {
    const { images } = build()
    expect(await images()).toHaveLength(imagesMockData.length)
  })

  // Here we expect to throw an exception, because the service timeout exceeds 1000 miliseconds
  it('throws exception when exceeds timeout', async () => {
    const { images } = build({ timeout: 1500 })
    try {
      await images()
    } catch (e) {
      expect(e.name).toEqual('TestingLibraryElementError')
    }
  })
})
