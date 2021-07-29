import React from 'react'
import {
  queryAllByRole,
  queryByLabelText,
  render,
} from '@testing-library/react'
import QueryBy from './QueryBy'

const checkboxesList = [
  {
    description: 'List Element #1',
    checked: true,
  },
  {
    description: 'List Element #2',
    checked: false,
  },
  {
    description: 'List Element #3',
    checked: true,
  },
  {
    description: 'List Element #4',
    checked: false,
  },
]

const build = (props) => {
  const { container } = render(
    <QueryBy {...props} checkboxesList={checkboxesList} />
  )
  return {
    container,
    allCheckboxes: () => queryAllByRole(container, 'checkbox'),
    checkedCheckboxes: () => queryAllByRole(container, 'checkbox'),
    checkbox1: () => queryByLabelText(container, checkboxesList[0].description),
  }
}

describe('QueryBy', () => {
  it('renders', () => {
    build()
  })

  it('renders all checkboxes', () => {
    const { allCheckboxes } = build()
    expect(allCheckboxes()).toHaveLength(checkboxesList.length)
  })

  it('does not render checked checkboxes', () => {
    const { checkedCheckboxes } = build({ renderChecked: false })
    expect(checkedCheckboxes()).toHaveLength(
      checkboxesList.filter(({ checked }) => !checked).length // 2
    )
  })

  it('does not render checkbox 1 checked', () => {
    const { checkbox1 } = build({ renderChecked: false })
    expect(checkbox1()).toBe(null)
  })
})
