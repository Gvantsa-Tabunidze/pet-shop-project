import type IAnimals from "./AnimalInterface";

export interface IPets {
    currency: string,
    loading: boolean,
    error: string | null,
    pets: IAnimals[],
    originalPets: IAnimals[]
}