import useLocalStorage from "./UseLocalStorage"

export const useWishList = ()=>{
    const [wishlist, setWishList] = useLocalStorage<number[]>('wishlist', [])

    const isInWishList = (id:number) => wishlist.includes(id)

    const toggleWishList = (id:number) =>{
        if(isInWishList(id)){
            setWishList(wishlist.filter(item=>item !==id))
        } else {
            setWishList([...wishlist, id])
        }
    }
    return { wishlist,isInWishList, toggleWishList}
}