import { Suspense } from 'react'
import { ProductSkeleton, ProductListSkeleton } from '@/components/product-skeleton'
import { ProductShowcaseWrapper } from '@/components/productShowcase/product-showcase-wrapper'

export default async function HomePage() {
  return (
    <>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="hero bg-gradient-to-r from-primary to-secondary rounded-2xl mb-12">
          <div className="hero-content text-center text-primary-content py-12">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold mb-4">Premium Glass</h1>
              <p className="text-lg opacity-90">
                Discover our hand crafted collection of custom glass pieces
              </p>
            </div>
          </div>
        </div>

        {/* Product Showcases */}
        <Suspense
          fallback={
            <div className="mb-16">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-8 animate-pulse"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <ProductSkeleton />
                </div>
                <div className="lg:col-span-1">
                  <ProductListSkeleton />
                </div>
              </div>
            </div>
          }
        >
          <ProductShowcaseWrapper category="bongs" title="Featured Bongs" />
        </Suspense>

        <Suspense
          fallback={
            <div className="mb-16">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-8 animate-pulse"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <ProductListSkeleton />
                </div>
                <div className="lg:col-span-2">
                  <ProductSkeleton />
                </div>
              </div>
            </div>
          }
        >
          <ProductShowcaseWrapper category="pipes" title="Featured Pipes" />
        </Suspense>

        <Suspense
          fallback={
            <div className="mb-16">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-8 animate-pulse"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <ProductSkeleton />
                </div>
                <div className="lg:col-span-1">
                  <ProductListSkeleton />
                </div>
              </div>
            </div>
          }
        >
          <ProductShowcaseWrapper category="bubblers" title="Bubblers" />
        </Suspense>
      </div>

      {/* Footer */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content"></footer>
    </>
  )
}
