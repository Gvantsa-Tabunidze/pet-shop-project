export default interface IPetcCard {
  id:number,
  img: string;
  name: string;
  priceGEL: number | string;
  priceUSD?:number | string;
}