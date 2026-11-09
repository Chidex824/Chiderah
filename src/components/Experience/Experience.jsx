import React from 'react'
import { getAnimationType } from 'react-scroll/modules/mixins/animate-scroll'
import index from '../../index.css'


const Experience = () => {
  return (
    <div className='bg-soft-white py-20 px-2 Experience container text-center mx-auto col-span-12 md:col-span-6 lg:col-span-4 color-black font-bold '>
      <h1 className='text-3xl xxs:text-4xl sm:max-xl:text-5xl xl:text-6xl font-semibold text-center mb-10'>
        Work Experience</h1>
      <div className='max-w-169 mx-auto'>
        <p className='text-[#A5ACB5] text-xs sm:text-lg font-normal text-center pb-8'>
          I have a strong background in web development, 
          with experience in both front-end and back-end technologies. 
          I have worked on a variety of projects, from small business websites to large-scale web applications. 
          My expertise includes HTML, CSS, JavaScript, React, Node.js, Python and Django. 
          I am passionate about creating user-friendly and visually appealing websites that meet the needs of my clients.
        </p>
      </div>


      <div className='max-w-169 mx-auto'>
        <h1>
          <span className='text-[#132238] font-semibold'>Company Name:</span> Beatsbox Inc.
        </h1>
        <p className='text-[#A5ACB5] text-xs sm:text-lg font-normal text-center pb-8'>
          <span className='text-[#132238] font-semibold'>Role:</span> Full Stack Developer
        </p>
        <p className='text-[#A5ACB5] text-xs sm:text-lg font-normal text-center pb-8'>
          <span className='text-[#132238] font-semibold'>Duration:</span> Jan 2025 - Present
        </p>
        <p className='text-[#A5ACB5] text-xs sm:text-lg font-normal text-center pb-8'>
          <span className='text-[#132238] font-semibold'>Responsibilities:</span> 
          Building a music streaming platform with real-time collaboration
          features for users and artists and record labels.
        </p>
      </div>

      <div className='max-w-169 mx-auto'>
        <h1>
          <span className='text-[#132238] font-semibold'>Company Name:</span> Chidex Technologies Ltd.
        </h1>
        <p className='text-[#A5ACB5] text-xs sm:text-lg font-normal text-center pb-8'>
          <span className='text-[#132238] font-semibold'>Role:</span> Front-End Developer
        </p>
        <p className='text-[#A5ACB5] text-xs sm:text-lg font-normal text-center pb-8'>
          <span className='text-[#132238] font-semibold'>Duration:</span> Jun 2023 - Dec 2023
        </p>
        <p className='text-[#A5ACB5] text-xs sm:text-lg font-normal text-center pb-8'>
          <span className='text-[#132238] font-semibold'>Responsibilities:</span>
            Built a django blog application from the ground up learning modern web development practices, implementing RESTful APIs and integrating with third-party services.
        </p>
      </div>

      <div className='max-w-169 mx-auto card'>
        <h1 className='card-body'>
          <span className='card-text-[#132238] font-semibold'>Company Name:</span> E-Double One Inc
        </h1>
        <p className='text-[#A5ACB5] text-xs sm:text-lg font-normal text-start pb-8'>
          <span className='text-[#132238] font-semibold'>Role:</span> Backend Developer Intern
        </p>
        <p className='text-[#A5ACB5] text-xs sm:text-lg font-normal text-start pb-8'>
          <span className='text-[#132238] font-semibold'>Duration:</span> July 2026 - October 2026
        </p>
        <p className='text-[#A5ACB5] text-xs sm:text-lg font-normal text-start pb-8'>
          <span className='text-[#132238] font-semibold'>Responsibilities:</span>
          Assisting in the design of the new edtech platform, learning Git collaborations through CI/CD, creating my own branch, making PRs.
        </p>
      </div>
        
    </div>
  )
}



export default Experience
