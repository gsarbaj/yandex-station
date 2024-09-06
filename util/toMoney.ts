function removeNonNumericAndSpacesAndConvertToNumber(str: string) {
    // Use a regular expression to replace all non-numeric characters and spaces with an empty string
    const numericString = str.replace(/[^0-9]/g, '');
    // Convert the resulting string to a number
    return parseInt(numericString);
}

interface PriceDetails {
    priceRegular: string;
    priceBefore: string;
}



export function toMoney(price: number): PriceDetails {

   const priceRegular: string =  (price / 100).toFixed(2)
   const priceBefore : string = ((price + 1900) / 100).toFixed(2)

    return {priceRegular, priceBefore}
}

// created on 05/08/2024 11:17
