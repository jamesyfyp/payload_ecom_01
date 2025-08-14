'use client'

import { useState } from 'react'
import { Media } from '@/payload-types'
import { ImageWithSkeleton } from './image-with-skeleton'

interface Props {
  primaryImage: Media
  images: Array<Media>
}

export function PlpImageGallery({ primaryImage, images }: Props) {
  // Combine primaryImage and images, ensuring no duplicate
  const allImages: Media[] = [primaryImage, ...images.filter((img) => img.id !== primaryImage.id)]

  const [selectedImage, setSelectedImage] = useState<Media>(primaryImage)

  return (
    <div className="relative w-full">
      {/* Primary Image Display */}
      {selectedImage?.url && (
        <ImageWithSkeleton
          src={selectedImage.url}
          alt={selectedImage.alt || 'Product image'}
          className="w-full h-auto rounded"
        />
      )}

      {/* Vertical Thumbnail List */}
      <div className="absolute bottom-[-12] md:bottom-0 rounded-lg w-full flex flex-cols gap-2 p-2 bg-neutral-300 md:bg-neutral-200/80 rounded-bl-lg shadow-lg  overflow-x-auto">
        {allImages.map((image) => {
          if (!image.url) return null

          return (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className={`p-1 border rounded h-12 w-12 flex-shrink-0 ${
                selectedImage.id === image.id
                  ? 'border-primary'
                  : 'border-transparent hover:border-accent-content/30'
              }`}
            >
              <ImageWithSkeleton
                src={image.url}
                alt={image.alt || 'Product image'}
                className="w-12 h-12 object-cover rounded"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}
