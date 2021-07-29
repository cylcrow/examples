/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import {
  myImagesService,
  singleItemService,
} from '../3MoreExamples/3_FindBy/services'
import { imagesMockData } from '../3MoreExamples/3_FindBy/mockData'

const Examples = ({
  displayImage,
  simulateSingleFetch,
  conditionalArray,
  simulateFetch,
}) => {
  const [item, setItem] = useState(null)
  const [items, setItems] = useState([])

  useEffect(() => {
    let rendered = true
    const fetchSingleItem = async () => {
      const response = await singleItemService()
      // eslint-disable-next-line no-unused-expressions
      rendered && setItem(response)
    }

    // eslint-disable-next-line no-unused-expressions
    simulateSingleFetch && fetchSingleItem()

    return () => {
      rendered = false
    }
  }, [])

  useEffect(() => {
    let rendered = true
    const fetchData = async () => {
      const response = await myImagesService()
      // eslint-disable-next-line no-unused-expressions
      rendered && setItems(response)
    }

    // eslint-disable-next-line no-unused-expressions
    simulateFetch && fetchData()

    return () => {
      rendered = false
    }
  }, [])

  return (
    <div>
      {/** This component is always rendered */}
      <button type="button">Submit form</button>

      {/** This component is conditionally rendered */}
      {displayImage && <img src="./image.png" alt="beautiful landscape" />}

      {/** This component is rendered once the asynchronous op has resolved */}
      {item && <img src={item.url} alt="random scenario" />}

      {/** These components are always rendered */}
      {imagesMockData.map(({ id, author }) => (
        <h4 key={id}>{author}</h4>
      ))}

      {/** These components are conditionally rendered */}
      <div>
        {conditionalArray &&
          imagesMockData.map(({ id, author, download_url }) => (
            <a href={download_url} key={id}>
              {author}
            </a>
          ))}
      </div>

      {/** These components are rendered once the asynchronous op has resolved */}
      <ol>
        {items.map(({ id, author }) => (
          <li key={id}>{author}</li>
        ))}
      </ol>
    </div>
  )
}

export default Examples
