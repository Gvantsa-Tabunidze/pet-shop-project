export default interface IAnimals {
      id: number | string,
      name: string,
      priceUSD: number,
      priceGEL: number,
      priceConverted?:number,
      description: string,
      isPopular: boolean,
      stock: number,
      img:string
}