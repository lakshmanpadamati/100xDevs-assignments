
import React from 'react'
import Link from 'next/link'
function Blog({id,title,subtitle,author}:{id:string,title:string,subtitle:string,author:{fullname:string}}) {
  
  return (
    <li key={id} className="p-4" >
            <Link href={`/${id}`}>
            <div className="flex  gap-4 ">
            <div>{title}</div>
            <div className="text-gray-400">{subtitle}</div>
            </div>
            <div>{author.fullname}</div>
            </Link>
          </li>
  )
}

export default Blog