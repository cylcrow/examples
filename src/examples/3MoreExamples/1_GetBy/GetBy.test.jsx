import React from 'react'
import { getAllByRole, getByRole, render } from '@testing-library/react'
import GetBy from './GetBy'

const build = (Component = <GetBy />) => {
  const { container } = render(Component)
  return {
    container,
    allButtons: () => getAllByRole(container, 'button'),
    button1: () => getByRole(container, 'button', { name: 'Button 1' }),
    button2: () => getByRole(container, 'button', { name: 'Button 2' }),
  }
}

describe('GetBy queries', () => {
  it('renders', () => {
    build()
  })

  it('contains one button with name `Button 1`', () => {
    const { button1 } = build()
    expect(button1()).toBeDefined()
  })

  it('contains one button with name `Button 2`', () => {
    const { button2 } = build()
    expect(button2()).toBeDefined()
  })

  it('contains two buttons', () => {
    const { allButtons } = build()
    expect(allButtons()).toHaveLength(2)
  })
})
