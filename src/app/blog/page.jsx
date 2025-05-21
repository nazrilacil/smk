import React from 'react'
import Header from '@/components/Header'
import Blog from '@/components/Blog'

const page = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
  <div className="h-32 rounded bg-gray-300">
    <Blog />
  </div>
  <div className="h-32 rounded bg-gray-300">
    <Blog />
  </div>
  <div className="h-32 rounded bg-gray-300">
    <Blog />
  </div>
</div>
    </div>
  )
}
export default page
