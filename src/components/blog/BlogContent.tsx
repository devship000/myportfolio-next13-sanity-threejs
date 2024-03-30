"use client"
import React from 'react'
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import urlFor from "@/lib/urlFor"
import { RichTextComponents } from "@/components/blog/RichTextComponents"
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store/store'

const BlogContent = (props: any) => {
    const {darkMode} = useSelector((state: RootState) => state.darkMode)
    return (
        <article className={`px-10 py-16 w-full sm:w-4/5 min-h-screen ml-0 sm:ml-[20%] ${darkMode ? 'bg-black-100 text-white-100' : 'bg-white-100 text-black-100'}`}>
            <section className="space-y-2 border border-primary">
                <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
                    <div className="absolute top-0 w-full h-full opacity-10 blur-sm p-10">
                        <Image 
                            className="object-cover object-left lg:object-center w-auto h-auto"
                            src={urlFor(props.mainImage).url()} 
                            alt={props.author.name}
                            sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%, 33vw"
                            fill/>
                    </div>

                    <section className="p-5 bg-primary w-full">
                        <div className="flex flex-col md:flex-row justify-between gap-y-5">
                            <div>
                                <h1 className="text-4xl font-extrabold">{props.title}</h1>
                                <p>
                                    {new Date(props._createdAt).toLocaleDateString("en-US",{
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    })}
                                </p>
                            </div>
                            <div className="flex items-center justify-end space-x-2">
                                <Image 
                                    className="rounded-full"
                                    src={urlFor(props.author.image).url()} 
                                    alt={props.author.name}
                                    width={30}
                                    height={30}
                                    />
                                <div className=" w-auto">
                                    <h3 className="font-bold text-lg">{props.author.name}</h3>
                                    <div>
                                        {/* TODO: Author bio */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="italic pt-10">{props.description}</h2>
                            <div className="flex items-center justify-end mt-auto space-x-2">
                                {props.categories.map((category: any) => (
                                    <p key={category._id} className=" 
                                    px-3 py-1 rounded-full text-sm font-semibold mt-4">
                                        {category.title}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>
            </section>
            <PortableText value={props.body} components={RichTextComponents}/>
        </article>
    )
}

export default BlogContent