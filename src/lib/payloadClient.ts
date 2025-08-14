import { getPayload } from 'payload'
import config from '@/payload.config'
import { PageProps } from '@payloadcms/ui/elements/Pagination/Page'
import { Product } from '@/payload-types'

const payloadConfig = await config
const payload = await getPayload({ config: payloadConfig })

export async function fetchProductsByCategory(category: string, limit: number) {
  const products = await payload.find({
    collection: 'products',
    where: {
      category: {
        equals: category,
      },
    },
    limit: limit,
  })
  return products
}

export async function fetchProductBySlug(product_slug: string): Promise<Product | null> {
  const result = await payload.find({
    collection: 'products',
    where: {
      slug: {
        equals: product_slug,
      },
    },
    limit: 1,
  })

  return result.docs[0] ?? null
}
