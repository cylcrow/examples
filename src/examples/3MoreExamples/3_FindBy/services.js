import { imagesMockData } from './mockData'

export const myImagesService = (timeout = 300) =>
  new Promise((resolve) => setTimeout(() => resolve(imagesMockData), timeout))

export const singleItemService = (timeout = 300) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(imagesMockData[0]), timeout)
  )
