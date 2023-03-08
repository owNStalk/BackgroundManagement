export const getImageSrc=(name)=>{
        return new URL( `../../../assets/${name}.jpg`, import.meta.url ).href
}