import Image from "next/image";
import Link from "next/link";
import urlFor from "@/lib/urlFor";

export const RichTextComponents = {
    types: {
        image: ({value}: any) => {
            return(
                <div className="relative w-full h-96 m-10 mx-auto">
                <Image 
                    className="object-contain"
                    src={urlFor(value).url()} 
                    alt="blog post image"
                    sizes="(max-width: 768px) 100%, (max-width: 1200px) 50%, 33vw"
                    fill/>
                </div>
            )
        },
    },
    list: {
      // Ex. 1: customizing common list types
      bullet: ({children}: any) => <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>,
      number: ({children}: any) => <ol className="mt-lg list-decimal">{children}</ol>,
  
      // Ex. 2: rendering custom lists
      checkmarks: ({children}: any) => <ol className="m-auto text-lg">{children}</ol>,
    },
    block: {
      // Ex. 1: customizing common block types
      h1: ({children}: any) => <h1 className="text-5xl py-10 font-bold">{children}</h1>,
      h2: ({children}: any) => <h2 className="text-4xl py-10 font-bold">{children}</h2>,
      h3: ({children}: any) => <h3 className="text-3xl py-10 font-bold">{children}</h3>,
      h4: ({children}: any) => <h4 className="text-2xl py-10 font-bold">{children}</h4>,
      blockquote: ({children}: any) => <blockquote className="border-l-[#97DAEE] border-l-4 pl-5 py-5 my-5">
        {children}</blockquote>,
    },
    marks: {
        // Ex. 1: custom renderer for the em / italics decorator
        em: ({children}: any) => <em className="text-gray-600 font-semibold">{children}</em>,
        // Ex. 2: rendering a custom `link` annotation
        link: ({value, children}: any) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
        return (
            <a href={value?.href} rel={target} className="underline decoration-[#97DAEE] hover:decoration-black">
                {children}
            </a>
        )
        },
    },
}