import React, { useEffect, useState } from 'react'
import { myImagesService } from './services'

const FindBy = ({ timeout }) => {
  const [images, setImages] = useState([])

  useEffect(() => {
    let mounted = true
    const callService = async () => {
      const responseData = await myImagesService(timeout)
      // eslint-disable-next-line no-unused-expressions
      mounted && setImages(responseData)
    }
    callService()
    return () => {
      mounted = false
    }
  }, [null])

  return (
    <div>
      {images.map(({ id, author, url }) => (
        <img key={id} src={url} alt={`${author}`} />
      ))}
    </div>
  )
}

export default FindBy
