import { fetchProductsByCategory } from '@/lib/payloadClient'
import { Product } from '@/payload-types'
import Link from 'next/link'

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params
  const data = await fetchProductsByCategory(category, 10)

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4 capitalize">{category}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {data.docs.map((product: Product) => {
          const image = typeof product.primaryImage === 'object' ? product.primaryImage : null

          return (
            <Link href={`/product/${product.slug}`} key={product.id} className="border p-4 rounded">
              <h2 className="font-semibold">{product.title}</h2>

              {image?.url && (
                <img
                  src={image.url}
                  alt={image.alt || product.title || 'Product image'}
                  className="w-full h-auto mt-2"
                />
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
