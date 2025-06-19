export default interface IAnimals {
      id: number,
      name: string,
      priceUSD: number | string,
      priceGEL: number,
      priceConverted?:number,
      description: string,
      isPopular: boolean,
      stock: number,
      img:string
}