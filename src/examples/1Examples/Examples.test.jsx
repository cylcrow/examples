import React from 'react'
import {
  findAllByRole,
  findByRole,
  getAllByRole,
  getByRole,
  queryAllByRole,
  queryByRole,
  render,
} from '@testing-library/react'
import { imagesMockData } from '../3MoreExamples/3_FindBy/mockData'
import Examples from './Examples'

const build = (props) => {
  const { container } = render(<Examples {...props} />)
  return {
    container,

    /** Queries for single elements */
    button: () => getByRole(container, 'button', { name: 'Submit form' }),
    image: () => queryByRole(container, 'img', { name: 'beautiful landscape' }),
    asyncItem: () => findByRole(container, 'img', { name: 'random scenario' }),

    /** Queries for multiple elements */
    headerItems: () => getAllByRole(container, 'heading'),
    anchorItems: () => queryAllByRole(container, 'link'),
    itemsList: () => findAllByRole(container, 'listitem'),
  }
}

describe('Examples', () => {
  it('renders', () => {
    build()
  })

  /** getBy example */
  it('always renders a button', () => {
    const { button } = build()
    expect(button()).toBeDefined()
  })

  // queryBy example #1
  it('does not display the landscape image', () => {
    const { image } = build({ displayImage: false })
    expect(image()).toBe(null)
  })

  // queryBy example #2
  it('does display the landscape image', () => {
    const { image } = build({ displayImage: true })
    expect(image()).not.toBe(null)
    expect(image()).toBeInstanceOf(HTMLImageElement)
  })

  // findBy example
  it('displays asynchronous item', async () => {
    const { asyncItem } = build({ simulateSingleFetch: true })
    expect(await asyncItem()).toBeDefined()
  })

  // getAllBy example
  it('always displays header items', () => {
    const { headerItems } = build()
    expect(headerItems()).toHaveLength(imagesMockData.length)
  })

  // queryAllByExample
  it('displays anchor items conditionally', () => {
    const { anchorItems } = build({ conditionalArray: true })
    expect(anchorItems()).toHaveLength(imagesMockData.length)
  })

  // findAllBy example
  it('displays list of items after fetching data', async () => {
    const { itemsList } = build({ simulateFetch: true })
    expect(await itemsList()).toHaveLength(imagesMockData.length)
  })
})
