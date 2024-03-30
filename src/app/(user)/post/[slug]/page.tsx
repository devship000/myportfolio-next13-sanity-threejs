import { client } from "@/lib/sanity.client"
import { groq } from "next-sanity"
import Image from "next/image"
import { PortableText } from "@portabletext/react"
import urlFor from "@/lib/urlFor"
import category from "../../../../../sanity/schemas/category"
import { RichTextComponents } from "@/components/blog/RichTextComponents"
import BlogContent from "@/components/blog/BlogContent"
import author from "../../../../../sanity/schemas/author"

type Props = {
    params: {
        slug: string
    }
}

// revalidate post page every 60s
export const revalidate = 60

export async function generateMetadata({params: {slug}}: Props) {
    const query = groq`
        *[_type=='post' && slug.current == $slug][0]{
            ...,
            author->,
            categories[]->,
        }
    `
    try {
        const post: Post = await client.fetch(query,{slug})
        if(!post) {
            return {
                title: "not found",
                description: "page you are looking is not found",
            }
        }
        return {
            title: post.title,
            description: post.description,
        }
    } catch (error) {
        return {
            title: "not found",
            description: "page you are looking is not found",
        }
    }
}

export async function generateStaticParams() {
    const query = groq`
        *[_type=='post']{
            slug
        }`
    const slugs: Post[] = await client.fetch(query)
    const slugRoutes = slugs.map((slug) => slug.slug.current)
    return slugRoutes.map((slug) => ({
        slug,
    }))
}

async function Post({params: {slug}}: Props) {
    const query = groq`
        *[_type=='post' && slug.current == $slug][0]{
            ...,
            author->,
            categories[]->,
        }
    `
    const post: Post = await client.fetch(query,{slug})
    return (
        <BlogContent key={post._id} {...post}/>
    )
}

export default Post