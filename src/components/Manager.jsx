import React, { useEffect, useEffectEvent } from 'react'
import { useRef, useState } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';



const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        if (passwords) {
            setPasswordArray(passwords)
            console.log(passwords)
        }
    }


    useEffect(() => {
        getPasswords()

    }, [])


    const showPassword = () => {

        if (ref.current.src.includes("/closed-eye.png")) {
            ref.current.src = "/eye.svg"
            passwordRef.current.type = "text"
        } else {
            passwordRef.current.type = "password"

            ref.current.src = "/closed-eye.png"
        }
    }

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {

            //If any such id exists in the db, delete item
            await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: form.id })
            })


            setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            await fetch("http://localhost:3000/", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, id: uuidv4() })
            })
            // localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            // console.log([...passwordArray, { ...form, id: uuidv4() }])

            //Clear inputs after submit
            setform({
                site: "",
                username: "",
                password: ""
            });
            toast('Saved Successfully!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        } else {
            toast('Not saved!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

    }

    const editPassword = (id) => {
        console.log("Editing password with id this: " + id)
        setform({ ...passwordArray.filter(item => item.id === id)[0], id: id })
        setPasswordArray(passwordArray.filter(item => item.id !== id))

    }

    const deletePassword = async (id) => {
        console.log("deleting password with id this: " + id)
        let c = confirm("Confirm deleting this password")
        if (c) {

            setPasswordArray(passwordArray.filter(item => item.id !== id))
            // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            let res = await fetch("http://localhost:3000/", {
                method: "DELETE", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id })
            })
            toast('Password deleted!', {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }

    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('🦄 Copied to clipboard', {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }



    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div>
                <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>

                <div className="p-4 md:p-0 lg:container lg:px-40 lg:py-6 lg:mx-auto">
                    <h1 className='text-3xl font-bold text-center'> <span style={{ color: '#A387FF' }}>&lt;</span>
                        <span className='text-white'>Pass</span>
                        <span style={{ color: '#A387FF' }}>Guard/&gt;</span>

                    </h1>
                    <p className='text-[#A387FF] text-lg text-center'>Your own Password Manager</p>

                    <div className="text-black flex flex-col p-4 gap-2 md:gap-8">
                        <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='bg-white border-2 border-[#A387FF] rounded-lg p-3 py-2 w-full' type="text" name="site" id="site" />

                        <div className="flex flex-col md:flex-row w-full gap-2 md:gap-8">

                            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='bg-white border-2 border-[#A387FF] rounded-lg p-3 py-2 w-full' type="text" name="username" id="username" />

                            <div className="relative w-full">

                                <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='bg-white border-2 border-[#A387FF] rounded-lg p-3 py-2 w-full' type="password" name="password" id="password" />

                                <span className='absolute right-2 top-2 cursor-pointer' onClick={showPassword}><img ref={ref} width={30} src="/closed-eye.png" alt="" /></span>
                            </div>
                        </div>
                        <div className="container flex justify-center items-center ">

                            <button onClick={savePassword} className='text-white w-full lg:w-1/4 text-center flex justify-center items-center gap-2 bg-indigo-500 rounded-full px-2 py-1 mt-3 md:mt-0 mb-4 text-xl hover:text-slate-300 hover:text-lg font-bold hover:font-medium hover:bg-indigo-400 hover:border '>
                                <lord-icon
                                    src="https://cdn.lordicon.com/sqmqtgjh.json"
                                    trigger="hover"
                                    colors="primary:#a387ff,secondary:#ffffff"
                                >
                                </lord-icon>
                                Save Password
                            </button>
                        </div>

                    </div>

                    <div className="passwords text-white">
                        <h2 className='font-bold text-xl py-2'>Your Passwords</h2>
                        {passwordArray.length === 0 && <div className='text-center py-5  text-2xl'>No passwords to show</div>}
                        {passwordArray.length != 0 &&
                            <div className="max-h-64 overflow-y-auto rounded-sm mb-5">
                                <table className="table-fixed w-full rounded-sm text-black">
                                    <thead className="bg-[#A387FF] text-black">
                                        <tr>
                                            <th className='py-2'>Site</th>
                                            <th className='py-2'>Username</th>
                                            <th className='py-2'>Password</th>
                                            <th className='py-2'>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-slate-200">
                                        {passwordArray.map((item, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td className='py-2 border border border-slate-300  md:border-b-slate-700 text-center align-middle w-1/3'>
                                                        <a className='block text-center' href={`https://${item.site}`} target="_blank" rel="noreferrer">{item.site}</a>
                                                    </td>
                                                    <td className='py-2 border border-slate-300 md:border-b-slate-700 text-center align-middle w-1/3'>
                                                        <div className='flex items-center justify-center gap-2'>
                                                            <span>{item.username}</span>
                                                            <button onClick={() => { copyText(item.username) }} type="button" className='p-1 cursor-pointer' aria-label="copy username"><img className='w-6' src="/copy.png" alt="copy" /></button>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border border-slate-300 md:border-b-slate-700 text-center align-middle w-1/3'>
                                                        <div className='flex items-center justify-center gap-2'>
                                                            <span>{"*".repeat(item.password.length)}</span>
                                                            <button onClick={() => { copyText(item.password) }} type="button" className='p-1 cursor-pointer' aria-label="copy password"><img className='w-6' src="/copy.png" alt="copy" /></button>
                                                        </div>
                                                    </td>
                                                    <td className='py-2 border border-slate-300 md:border-b-slate-700 text-center align-middle w-1/3'>
                                                        <div className='flex items-center justify-center gap-2'>

                                                            <button onClick={() => { editPassword(item.id) }} type="button" className='p-1 cursor-pointer' aria-label="edit"><img className='w-6' src="/edit.png" alt="edit" /></button>

                                                            <button onClick={() => { deletePassword(item.id) }} type="button" className='p-1 cursor-pointer' aria-label="delete"><img className='w-8' src="/delete3.svg" alt="delete" /></button>

                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Manager
