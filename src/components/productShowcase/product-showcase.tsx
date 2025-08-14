'use client'
import { useState } from 'react'
import type { Product } from '@/payload-types'
import { ImageWithSkeleton } from '../image-with-skeleton'
import { serializeRichText } from '@/utils/rich-text-serializer'
import Link from 'next/link'
import { RichText } from '../RichText'

interface ProductShowcaseProps {
  products: Product[]
  title: string
}

export function ProductShowcase({ products, title }: ProductShowcaseProps) {
  // State for selected product and image
  const [selectedProductIndex, setSelectedProductIndex] = useState(0)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (products.length === 0) return null

  const selectedProduct = products[selectedProductIndex]

  // Create combined images array (primary image + gallery images)
  const allImages = []
  // Add primary image first
  if (typeof selectedProduct.primaryImage === 'object' && selectedProduct.primaryImage !== null) {
    allImages.push({
      url: selectedProduct.primaryImage.url ?? '',
      alt: selectedProduct.primaryImage.alt ?? '',
    })
  }
  // Add gallery images
  if (selectedProduct.gallery && Array.isArray(selectedProduct.gallery)) {
    selectedProduct.gallery.forEach((item) => {
      if (typeof item.image === 'object' && item.image !== null) {
        allImages.push({
          url: item.image.url ?? '',
          alt: item.image.alt ?? '',
        })
      }
    })
  }

  const currentImage = allImages[selectedImageIndex] || allImages[0]

  const handleProductSelect = (index: number) => {
    setSelectedProductIndex(index)
    setSelectedImageIndex(0) // Reset to first image when switching products
  }

  const handleImageSelect = (index: number) => {
    setSelectedImageIndex(index)
  }

  return (
    <div className="mb-16">
      <div className="flex items-center gap-4 pb-4">
        {' '}
        {/* Added items-center for vertical alignment */}
        <h2 className={`text-2xl md:text-4xl font-bold mb-0 text-primary md:text-left text-center`}>
          {title}
        </h2>
        <Link
          className="btn btn-sm btn-accent" // DaisyUI button classes: btn, btn-sm (small), btn-primary (primary color)
          href={`/products/${title.split(' ')[1].toLowerCase()}`}
        >
          more {title.split(' ')[1].toLowerCase()}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1" // Tailwind classes for size and margin-left
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      {/* Product Selector - Above main content, consistent across all screens */}
      <div className="mb-6">
        <div className="card bg-base-200 shadow-lg md:w-3/4">
          <div className="card-body p-4">
            <h4 className={`text-lg font-semibold mb-4 text-base-content px-2 text-left`}>
              Select {title}
            </h4>
            <div className={`flex gap-3 p-2 md:scrollbar-hide overflow-x-auto overflow-y-hidden`}>
              {products.map((product: Product, index: number) => (
                <div
                  key={product.id}
                  className={`flex-shrink-0 w-18 h-18 cursor-pointer transition-all duration-200 relative ${
                    selectedProductIndex === index ? 'scale-105' : ''
                  }`}
                  onClick={() => handleProductSelect(index)}
                >
                  <div
                    className={`w-full h-full rounded-lg overflow-hidden transition-all duration-200 inset-0 ${
                      selectedProductIndex === index
                        ? 'border-2 border-accent shadow-lg'
                        : 'hover:border-2 hover:border-accent/50 hover:shadow-md'
                    }`}
                  >
                    {typeof product.primaryImage === 'object' && product.primaryImage !== null && (
                      <ImageWithSkeleton
                        src={product.primaryImage.url ?? ''}
                        alt={product.primaryImage.alt ?? ''}
                        className="w-full h-full object-cover"
                        skeletonClassName="w-20 h-20"
                      />
                    )}
                    {/* Title overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end">
                      <div className="p-2 w-full">
                        <h5
                          className={`text-xs font-semibold text-white text-center leading-tight ${
                            selectedProductIndex === index ? 'drop-shadow-lg' : ''
                          }`}
                        >
                          {product.title}
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8`}>
        {/* Featured Product */}
        <div className={`lg:col-span-2`}>
          <div className="card bg-neutral-900 shadow-xl">
            <div className="card-body p-4 md:p-6">
              {/* Mobile: Single column layout */}
              <div className="md:hidden space-y-4">
                {/* Main Image */}
                {currentImage && (
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <ImageWithSkeleton
                      src={currentImage.url || '/placeholder.svg'}
                      alt={currentImage.alt}
                      className="w-full h-full object-cover"
                      skeletonClassName="aspect-square"
                    />
                  </div>
                )}
                {/* Image Thumbnails - Below main image on mobile */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {allImages.map((image, index) => (
                      <div key={index} className="flex-shrink-0">
                        <div
                          className={`w-16 h-16 rounded-md overflow-hidden border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            selectedImageIndex === index
                              ? 'border-accent ring-2 ring-accent/50'
                              : 'border-gray-300 hover:border-accent/60'
                          }`}
                          onClick={() => handleImageSelect(index)}
                        >
                          <ImageWithSkeleton
                            src={image.url || '/placeholder.svg'}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                            skeletonClassName="w-16 h-16"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {/* Product Info */}
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-base-content">
                    {selectedProduct.title}
                  </h3>
                  {selectedProduct.description && (
                    <div className="text-white p-2 [&_h2]:font-black [&_ul>li]:list-disc [&_ul]:pl-5 ">
                      {selectedProduct.description && (
                        <RichText data={selectedProduct.description} />
                      )}
                    </div>
                  )}
                </div>
              </div>
              {/* Desktop: Two column layout */}
              <div className="hidden md:grid md:grid-cols-2 gap-8">
                {/* Primary Image with Gallery Overlay */}
                <div>
                  {currentImage && (
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                      <ImageWithSkeleton
                        src={currentImage.url || '/placeholder.svg'}
                        alt={currentImage.alt}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        skeletonClassName="aspect-square"
                      />
                      {/* Gallery Overlay - Desktop only */}
                      {allImages.length > 1 && (
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-1">
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                              {allImages.map((image, index) => (
                                <div key={index} className="flex-shrink-0">
                                  <div
                                    className={`w-12 h-12 rounded-md overflow-hidden border-2 cursor-pointer transition-all duration-200 ${
                                      selectedImageIndex === index
                                        ? 'border-accent'
                                        : 'border-white/20 hover:border-white/60'
                                    }`}
                                    onClick={() => handleImageSelect(index)}
                                  >
                                    <ImageWithSkeleton
                                      src={image.url || '/placeholder.svg'}
                                      alt={image.alt}
                                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-200"
                                      skeletonClassName="w-12 h-12"
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                {/* Product Info - Desktop */}
                <div className={`p-4`}>
                  <h3 className="text-2xl font-bold mb-3 text-base-content">
                    {selectedProduct.title}
                  </h3>
                  {selectedProduct.description && (
                    <div className="text-white p-2 [&_h2]:font-black [&_ul>li]:list-disc [&_ul]:pl-5 ">
                      {selectedProduct.description && (
                        <RichText data={selectedProduct.description} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Empty space for flip layout */}
        <div className={`hidden lg:block lg:col-span-1`}>
          {/* This space is intentionally left empty to allow the flip layout to work properly */}
        </div>
      </div>
    </div>
  )
}
