import Link from 'next/link';
import React from 'react';
import { BiBell } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';
import Dropdown from './dropdown';
export default ()=>{
    return <div className="jsad-asdnsake">
    <div className="nadjfksad-asds">
      <Dropdown />
      <div className="dsnodi-sdjsad">
        <FiSearch color="#8A8A8A" size={17} />
        <input type="text" placeholder="Search" />
      </div>
    </div>

    <div className="idsafs-aadmsd">
      <div className="kdsfsd-dsdd">
        <BiBell size={20} />
        <p>1</p>
      </div>
      <div className="kdsfsd-dsdd">
        <IoMailOutline color="#A2A2A2" size={20} />
        <p>1</p>
      </div>

      <p>John Doe</p>
      <Link href={"/en/profile"}>
      <img src="/assets/images/umpire-1.svg" />
      </Link>
      
    </div>
  </div>
}