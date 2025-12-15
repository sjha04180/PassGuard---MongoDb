import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-[#2C1667]  text-white '>
            <div className="lg:container lg:px-40 lg:py-6 lg:mx-auto flex justify-between items-center px-4 py-5 h-14">

                <div className="logo font-bold text-white text-2xl">
                    <span style={{ color: '#A387FF' }}>&lt;</span>
                    <span>Pass</span>
                    <span style={{ color: '#A387FF' }}>Guard/&gt;</span>
                </div>
                
                <button className='text-white flex justify-center items-center rounded-full bg-slate-600 px-2 ring-white ring-1'>
                    <img className='w-11' src="/github1.png" alt="github logo" />
                    <p className='text-xl font-bold'>GitHub</p>
                </button>
            </div>
        </nav>
    )
}

export default Navbar

