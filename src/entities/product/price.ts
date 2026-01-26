import { IProductPriceDataFragment } from "@/generated/schema-types";


export function getProductPrice(data: IProductPriceDataFragment | null | undefined) {
    return data?.price ?? 0
}