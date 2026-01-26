import { IProductTitleDataFragment } from "@/generated/schema-types";



export function getProductTitle(data: IProductTitleDataFragment | null | undefined) {
    return data?.title 
}