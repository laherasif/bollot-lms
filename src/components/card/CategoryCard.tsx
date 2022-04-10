import React from 'react';
import Icons from '../../icons';
import Image from 'next/image'
import Link  from 'next/link'
const notfound = require('../../assests/notfun.png')
export default ({ icon, catagory, key }: { icon: string, catagory: any, key: string }) => {
  return (
    <Link href={`/en/courses/${catagory?.slug}`}>
      <div className="category" key={key} style={{cursor:'pointer'}}>
        <Image src={icon} alt="icon" width="100%" height="100%" objectFit='contain' />
        <h3 style={{ textAlign: 'center', paddingTop: '10px' }}>{catagory?.name}</h3>
      </div>
    </Link>
  )

}