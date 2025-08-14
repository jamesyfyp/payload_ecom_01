import { fetchProductBySlug } from '@/lib/payloadClient'
import { Product, Media } from '@/payload-types'
import { RichText } from '@/components/RichText'
import ContactModalButton from '@/components/contact-modal'
import { PlpImageGallery } from '@/components/plpImageGallery'

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product: Product | null = await fetchProductBySlug(params.slug)

  if (!product) return <div>Product not found.</div>

  // Safely narrow primaryImage to a Media object
  const image = typeof product.primaryImage === 'object' ? (product.primaryImage as Media) : null
  const images: Media[] = product.gallery
    ?.map((item) => {
      if (typeof item?.image === 'object' && item.image !== null && 'url' in item.image) {
        return item.image as Media
      }
    })
    .filter(Boolean) as Media[] // filter out undefineds, then assert the array

  return (
    <div className="flex justify-center">
      <div className="card  p-6 w-[350px] md:w-[750px] m-10 bg-neutral-700 ">
        <h1 className="text-4xl font-bold text-accent">{product.title}</h1>
        {image && <PlpImageGallery primaryImage={image} images={images} />}
        <div className="text-white pt-20 md:pt-2 md:span-2 [&_h2]:font-black [&_ul>li]:list-disc [&_ul]:pl-5 p-2">
          {product.description && <RichText data={product.description} />}
        </div>
        <ContactModalButton buttonText="Contact Sales" />
      </div>
    </div>
  )
}
