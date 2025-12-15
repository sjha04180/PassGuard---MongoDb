import React from 'react'

const Footer = () => {
    return (
        <div className='bg-black text-white flex flex-col justify-center items-center border-t-black border-b-black '>
            <div className="logo font-bold text-white text-2xl">
                <span style={{ color: '#A387FF' }}>&lt;</span>
                <span>Pass</span>
                <span style={{ color: '#A387FF' }}>Guard/&gt;</span>
            </div>
            <div className='flex justify-between items-center'>
                Created with <img className='w-6' src="/heart.svg" alt="heart logo" /> by Sachin
            </div>
        </div>
    )
}

export default Footer
