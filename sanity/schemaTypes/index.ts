import { type SchemaTypeDefinition } from 'sanity'
import { categoryType } from './categoryType'
import { addressType } from './addressType'
import { brandType } from './brandType'
import { productType } from './productType'
import { orderType } from './orderType'
import { storeType } from './storeType'
import { locationType } from './locationType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, addressType, brandType, productType, orderType, storeType, locationType],
}
