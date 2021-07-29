/* eslint-disable max-len */
import React, { useEffect, useState } from 'react'
import { myImagesService } from '../3MoreExamples/3_FindBy/services'

const General = ({ inputsList }) => {
  const [serviceElements, setServiceElements] = useState([])

  useEffect(() => {
    let mounted = true
    const callService = async () => {
      const responseData = await myImagesService()
      // eslint-disable-next-line no-unused-expressions
      mounted && setServiceElements(responseData)
    }
    callService()
    return () => {
      mounted = false
    }
  }, [null])

  return (
    <div>
      {/** DIV elements doesn't have a default role, but you can assign them one */}
      <div role="button">chicken and onions</div>

      {/** Overriding default roles it is also possible but it is a discouraged practice */}
      <img src="./place.png" alt="This is my img tag" />
      {/* <div role="img" alt="This is my img tag" /> */}

      {/** Labels help screen screen readers know whats the state of the element they're related to
       * react testing library supports querying elements represented by a label.
       */}
      <>
        {inputsList &&
          inputsList.map(({ id, value, label }) => (
            <div key={id}>
              <label htmlFor={id}>{label}</label>
              <input id={id} type="text" key={id} value={value} readOnly />
            </div>
          ))}
      </>

      {/** DIV tags do not have role, but you can query the element they represent by its text content */}
      <p>This is a simple text, humble, small.</p>

      {/** elements can be queried by the value they hold */}
      <input type="text" value="This is a readonly input" readOnly />

      {/** alternative texts help screen readers to give the user relevant feedback about what's displayed on the screen
       * or when the resource provided to the element is faulty or couldn't by found.
       */}
      <img src="faultyImage.zzz" alt="This is probably a joke" />

      {/**
       * data-testid attribute is only useful when tags have no role or there's no other way to query them.
       * Otherwise, it is encouraged to use other queries with higher priority
       */}
      {serviceElements.map(({ id }) => (
        <div key={id} data-testid={`service-element-${id}`} />
      ))}
    </div>
  )
}

export default General
