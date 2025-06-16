export default interface IPetcCard {
  id:number | string,
  img: string;
  name: string;
  priceGEL: number | string;
  priceUSD?:number | string;
}