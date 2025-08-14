import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { ProductShowcase } from './product-showcase'

export async function ProductShowcaseWrapper({
  category,
  title,
}: {
  category: string
  title: string
}) {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const products = await payload.find({
    collection: 'products',
    where: {
      category: {
        equals: category,
      },
    },
    limit: 5,
  })

  return <ProductShowcase products={products.docs} title={title} />
}
