'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ImageWithSkeletonProps {
  src: string
  alt: string
  className?: string
  skeletonClassName?: string
}

export function ImageWithSkeleton({
  src,
  alt,
  className = '',
  skeletonClassName = '',
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <div className="relative w-full aspect-square overflow-hidden rounded-lg">
      {isLoading && (
        <div className={`absolute inset-0 bg-gray-300 animate-pulse ${skeletonClassName}`} />
      )}

      {!hasError && (
        <Image
          src={src}
          alt={alt}
          sizes="500"
          fill
          className={`object-cover ${className} ${
            isLoading ? 'opacity-0' : 'opacity-100'
          } transition-opacity duration-300`}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}

      {hasError && (
        <div
          className={`absolute inset-0 bg-gray-200 flex items-center justify-center ${skeletonClassName}`}
        >
          <span className="text-gray-500 text-sm">Failed to load</span>
        </div>
      )}
    </div>
  )
}
