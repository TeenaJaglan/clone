import React from 'react'

export default function StatsComponent() {
  return (
    <section className="my-6 bg-richblack-700">
    <div className="md:grid md:grid-cols-4 gap-2  sm:flex sm:flex-col justify-self-center col-span-1">
      <div className="flex flex-col text-center p-2 ">
        <p className="font-bold text-3xl text-richblack-100 py-1">5K</p>
        <p className="text-richblack-400">Active Students</p>
        </div>
        <div className="flex flex-col text-center p-2 ">
        <p className="font-bold text-3xl text-richblack-100 py-1">10+</p>
        <p className="text-richblack-400">Mentors</p>
        </div>
        <div className="flex flex-col text-center p-2 ">
        <p className="font-bold text-3xl text-richblack-100 py-1">200+</p>
        <p className="text-richblack-400">Courses</p>
        </div>
        <div className="flex flex-col text-center p-2 ">
        <p className="font-bold text-3xl text-richblack-100 py-1">50+</p>
        <p className="text-richblack-400">Awards</p>
        </div>
    </div>
  </section>
  )
}
