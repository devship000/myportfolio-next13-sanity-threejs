"use client"
import React from 'react'
import Image from "next/image"
import urlFor from "@/lib/urlFor"
import { DateInput } from "sanity"
import category from "../../../sanity/schemas/category"
import ClientSideRoute from "./ClientSideRoute"
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'
import { motion } from 'framer-motion'
import { textVariant } from '@/utils/motion'
import Navbar from '../Navbar'
import StarsCanvas from '../canvas/Stars'

type Props = {
    posts: Post[]
}

const BlogList = ({posts}: Props) => {
    const {darkMode} = useSelector((state: RootState) => state.darkMode)
    return (
        <div className={`relative z-0`}>
            <section className={`absolute w-full sm:w-4/5 h-fit min-h-screen ml-0 sm:ml-[20%] ${darkMode ? 'bg-black-100' : 'bg-white-100'}`}>
                <div className={`relative sm:px-16 px-6 ${darkMode ? 'text-white-100' : 'text-black-100'}`}>
                    <motion.div variants={textVariant(0.2)}>
                        <h2 className="font-black lg:text-5xl sm:text-3xl xs:text-2xl text-xl mt-14">Blog.</h2>
                    </motion.div>
                    <div className='sm:mt-16 mt-8 flex'>
                        <hr className="bg-primary h-1 mb-10"/>
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10 gap-y-16 pb-24">
                            {posts.length ? 
                            posts.map((post) => (
                            <ClientSideRoute key={post._id} route={`/post/${post.slug.current}`}>
                                <div className="flex flex-col group cursor-pointer">
                                    <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">

                                        <Image 
                                            className="object-cover object-left lg:object-center w-auto h-auto"
                                            src={urlFor(post.mainImage).url()} 
                                            alt={post.author.name}
                                            sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%, 33vw"
                                            fill/>

                                        <div className="absolute bottom-0 w-full bg-opacity-20 bg-black backdrop-blur-lg rounded 
                                        drop-shadow-lg text-white p-5 flex justify-between">
                                            <div>
                                            <p className="font-bold">{post.title}</p>
                                            <p>
                                                {new Date(post._createdAt).toLocaleDateString("en-US",{
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                                })}
                                            </p>
                                            </div>
                                            <div className="flex flex-col md:flex-row gap-y-2 md:gap-x-2 items-center">
                                            {post.categories.map((category) => (
                                                <div className="bg-primary text-center text-black px-3 py-1 rounded-full text-sm font-semibold">
                                                <p>{category.title}</p>
                                                </div>
                                            ))}
                                            </div>
                                        </div>

                                    </div>

                                    <div className="mt-5 flex-1">
                                        <p className="underline text-lg font-bold">{post.title}</p>
                                        <p className="line-clamp-2 text-gray-500">{post.description}</p>
                                    </div>

                                    <p className="mt-5 font-bold flex items-center group-hover:underline">Read Post 
                                        <span>
                                            <Image src="/arrow-right.svg" width={5} height={5} alt="arrow-r" className="ml-2 h-4 w-4"/>
                                        </span>
                                    </p>
                                </div>
                            </ClientSideRoute>
                            ))
                            :
                            <p className="mt-5 font-bold flex items-center group-hover:underline text-[25px]"> Coming soon... </p>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div>
        
    )
}

export default BlogList