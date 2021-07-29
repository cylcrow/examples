import React from 'react'
import {
  findAllByTestId,
  getByRole,
  queryAllByLabelText,
  queryByDisplayValue,
  queryByText,
  render,
} from '@testing-library/react'
import Priority from './Priority'

const inputsList = [
  { id: 'input_1', value: 'Input value 1', label: 'Input 1' },
  { id: 'input_2', value: 'Input value 2', label: 'Input 2' },
  { id: 'input_3', value: 'Input value 3', label: 'Input 3' },
  { id: 'input_4', value: 'Input value 4', label: 'Input 4' },
]

const build = (props) => {
  const { container } = render(<Priority {...props} />)
  return {
    container,

    // querying element by `button` role
    button: () => getByRole(container, 'button'),

    // querying elements with roles set manually will fail when we use specificity in options
    image: () => getByRole(container, 'img', { name: 'This is my img tag' }),

    // querying all dom elements by its label description
    inputsByLabel: () => queryAllByLabelText(container, /Input/i),

    // querying element by its text content
    paragraph: () =>
      queryByText(container, 'This is a simple text, humble, small.', {
        exact: true,
      }),

    // querying input by its current value
    readOnlyInput: () =>
      queryByDisplayValue(container, 'This is a readonly input', {
        exact: true,
      }),

    // querying all elements by their test-id
    elementsFromService: () =>
      findAllByTestId(container, (id) => id.includes('service-element-')),
  }
}

describe('Priority', () => {
  it('renders', () => {
    // eslint-disable-next-line no-unused-vars
    const { container } = build()
    // logRoles(container)
  })

  // #1 div as button
  it('contains a button', () => {
    const { button } = build()
    expect(button()).not.toBeNull()
  })

  // #2
  it('finds image by alt text', () => {
    const { image } = build()
    expect(image()).toBeDefined()
  })

  // #3
  it('renders inputs and check that they contain proper values', () => {
    const { inputsByLabel } = build({ inputsList })
    const foundInputs = inputsByLabel()
    expect(foundInputs).toHaveLength(4)
    foundInputs.forEach((input, index) =>
      expect(input).toHaveValue(inputsList[index].value)
    )
  })

  // #4
  it('renders paragraph', () => {
    const { paragraph } = build()
    expect(paragraph()).toBeInstanceOf(HTMLParagraphElement)
  })

  // #5
  it('renders a readonly input', () => {
    const { readOnlyInput } = build()
    /* If you assert toBeDefined it'll be as false positive test, because 
      it could return null and that's a valid value for that assertion * */
    expect(readOnlyInput()).not.toBe(null)
  })

  // #6
  it('renders elements from service', async () => {
    const { elementsFromService } = build()
    expect(await elementsFromService()).toHaveLength(30)
  })
})
