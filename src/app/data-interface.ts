export interface categories {
  name: string
  image: string
}
export interface product {
  _id: string
  title: string
  price: number
  imageCover: string
  category: productCategory
  ratingsAverage: number
}


export interface productCategory {
  name: string
}
