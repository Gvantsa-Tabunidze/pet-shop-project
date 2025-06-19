export default interface IUseFetch {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; 
}