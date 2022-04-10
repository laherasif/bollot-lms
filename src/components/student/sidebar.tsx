import React from 'react';
import Link from 'next/link'
import {MdOutlineReviews} from 'react-icons/md'
import {BsWallet2} from 'react-icons/bs'
export default ()=>{

  const openPan=()=>{
    const element = document.querySelector("#sidebar-cst");
    const element1 = document.querySelector(".dash-board-1");
    if(element?.classList.contains('sidebaropen'))
    {
        element?.classList.remove('sidebaropen')
    }
    else
    {
      element?.classList.add('sidebaropen')
    }
    if(element1?.classList.contains('sidebaropen-p'))
    {
        element1?.classList.remove('sidebaropen-p')
    }
    else
    {
      element1?.classList.add('sidebaropen-p')
    }
  }
    return <div className="dash-1 mnsada-3ej" id='sidebar-cst' >
    <div className="dash-ch-1">
      <img src="/assets/images/small-logo.svg" alt="image" />
      <button className='jdsaif-dsnd' onClick={()=>openPan()} >
      <img src="/assets/images/lines.svg" alt="image" className='ajsdhsia-dsadas' />
      </button>
    </div>
    <Link href="/en/student/dashboard" >
      <div className="dash-ch-2">
      <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29.333 11.027V5.64C29.333 3.52 28.48 2.667 26.36 2.667H20.973C18.853 2.667 18 3.52 18 5.64V11.027C18 13.147 18.853 14 20.973 14H26.36C28.48 14 29.333 13.147 29.333 11.027Z" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 11.36V5.307C14 3.427 13.147 2.667 11.027 2.667H5.63999C3.51999 2.667 2.66699 3.427 2.66699 5.307V11.347C2.66699 13.24 3.51999 13.987 5.63999 13.987H11.027C13.147 14 14 13.24 14 11.36Z" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 26.36V20.973C14 18.853 13.147 18 11.027 18H5.63999C3.51999 18 2.66699 18.853 2.66699 20.973V26.36C2.66699 28.48 3.51999 29.333 5.63999 29.333H11.027C13.147 29.333 14 28.48 14 26.36Z" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 20.667H28" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" />
        <path d="M20 26H28" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" />
      </svg>
      <h3>Dashboard</h3></div>
    </Link>
    <Link href="/en/student/courses">
    <div className="dash-ch-2">
      <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M29.3337 22.32V6.22667C29.3337 4.62667 28.027 3.44 26.4403 3.57334H26.3603C23.5603 3.81334 19.307 5.24 16.9337 6.73334L16.707 6.88C16.3203 7.12 15.6803 7.12 15.2937 6.88L14.9603 6.68C12.587 5.2 8.34699 3.78667 5.54699 3.56C3.96033 3.42667 2.66699 4.62667 2.66699 6.21334V22.32C2.66699 23.6 3.70699 24.8 4.98699 24.96L5.37366 25.0133C8.26699 25.4 12.7337 26.8667 15.2937 28.2667L15.347 28.2933C15.707 28.4933 16.2803 28.4933 16.627 28.2933C19.187 26.88 23.667 25.4 26.5737 25.0133L27.0137 24.96C28.2937 24.8 29.3337 23.6 29.3337 22.32Z" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 7.32001V27.32" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.333 11.32H7.33301" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M11.333 15.32H7.33301" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h3>My courses</h3>
    </div>
    </Link>
    <Link href="/en/student/settings">
    <div className="dash-ch-2">
      <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.0002 29.3326H20.0002C26.6665 29.3326 29.3339 26.6663 29.3339 19.999V12C29.3328 5.33264 26.6665 2.66632 20.0002 2.66632H12.0002C5.33283 2.66632 2.6665 5.33264 2.6665 12V20C2.6665 26.6663 5.33283 29.3326 12.0002 29.3326Z" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9.77344 19.3197L12.9466 15.2C13.0545 15.0603 13.1889 14.9433 13.3421 14.8557C13.4953 14.768 13.6643 14.7115 13.8394 14.6892C14.0145 14.667 14.1922 14.6795 14.3625 14.726C14.5327 14.7726 14.6921 14.8523 14.8315 14.9605L17.2718 16.8805C17.5522 17.097 17.9065 17.1946 18.2582 17.1521C18.6099 17.1096 18.9307 16.9305 19.1515 16.6534L22.2266 12.6803" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h3>Settings</h3>
    </div></Link>
<Link href="/en/student/bookmarks">
<div className="dash-ch-2">
      <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.3335 12.0667C14.7068 12.9333 17.2935 12.9333 19.6668 12.0667" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.4268 2.66666H9.57342C6.73342 2.66666 4.42676 4.98666 4.42676 7.81332V26.6C4.42676 29 6.14676 30.0133 8.25342 28.8533L14.7601 25.24C15.4534 24.8533 16.5734 24.8533 17.2534 25.24L23.7601 28.8533C25.8668 30.0267 27.5868 29.0133 27.5868 26.6V7.81332C27.5734 4.98666 25.2668 2.66666 22.4268 2.66666Z" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22.4268 2.66666H9.57342C6.73342 2.66666 4.42676 4.98666 4.42676 7.81332V26.6C4.42676 29 6.14676 30.0133 8.25342 28.8533L14.7601 25.24C15.4534 24.8533 16.5734 24.8533 17.2534 25.24L23.7601 28.8533C25.8668 30.0267 27.5868 29.0133 27.5868 26.6V7.81332C27.5734 4.98666 25.2668 2.66666 22.4268 2.66666Z" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h3>Bookmarks</h3>
    </div>
    
    </Link>
    <Link href="/en/student/accomplishment">
    <div className="dash-ch-2">
      <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.68018 14.6933V21.32C5.68018 23.7467 5.68018 23.7467 7.97351 25.2933L14.2802 28.9333C15.2268 29.48 16.7735 29.48 17.7202 28.9333L24.0268 25.2933C26.3202 23.7467 26.3202 23.7467 26.3202 21.32V14.6933C26.3202 12.2667 26.3202 12.2667 24.0268 10.72L17.7202 7.08001C16.7735 6.53335 15.2268 6.53335 14.2802 7.08001L7.97351 10.72C5.68018 12.2667 5.68018 12.2667 5.68018 14.6933Z" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23.3332 10.1733V6.66666C23.3332 3.99999 21.9998 2.66666 19.3332 2.66666H12.6665C9.99984 2.66666 8.6665 3.99999 8.6665 6.66666V10.08" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.8399 14.6533L17.5999 15.84C17.7199 16.0267 17.9865 16.2133 18.1865 16.2667L19.5465 16.6133C20.3865 16.8267 20.6132 17.5467 20.0665 18.2133L19.1732 19.2933C19.0399 19.4667 18.9332 19.7733 18.9465 19.9867L19.0265 21.3867C19.0799 22.2533 18.4665 22.6933 17.6665 22.3733L16.3599 21.8533C16.1599 21.7733 15.8265 21.7733 15.6265 21.8533L14.3199 22.3733C13.5199 22.6933 12.9065 22.24 12.9599 21.3867L13.0399 19.9867C13.0532 19.7733 12.9465 19.4533 12.8132 19.2933L11.9199 18.2133C11.3732 17.5467 11.5999 16.8267 12.4399 16.6133L13.7999 16.2667C14.0132 16.2133 14.2799 16.0133 14.3865 15.84L15.1465 14.6533C15.6265 13.9333 16.3732 13.9333 16.8399 14.6533Z" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h3>Accomplisments</h3>
    </div>
    </Link>
    <Link href="/en/student/reviews">
    <div className="dash-ch-2">
      <MdOutlineReviews color='#a2a2a2' size={22}/>
      <h3>Reviews</h3>
    </div>
    </Link>
    <Link href="/en/student/purchase">
    <div className="dash-ch-2">
     <BsWallet2 color='#a2a2a2' size={22} />
      <h3>purchase</h3>
    </div>
    </Link>
   
    <div className="client-img">
      <h3>Recommended Tutors</h3>
      <div className="client ">
        <img src="/assets/images/client-1.svg" alt="image" />
        <div className="client-ch">
          <h3>John Doe</h3>
          <p>42 Listed Courses</p>
        </div>
      </div>
      <div className="client ">
        <img src="/assets/images/cliet-2.svg" alt="image" />
        <div className="client-ch">
          <h3>John Doe</h3>
          <p>42 Listed Courses</p>
        </div>
      </div>
      <div className="client ">
        <img src="/assets/images/client-3.svg" alt="image" />
        <div className="client-ch">
          <h3>John Doe</h3>
          <p>42 Listed Courses</p>
        </div>
      </div>
      <div className="client mb-27">
        <img src="/assets/images/client-4.svg" alt="image" />
        <div className="client-ch">
          <h3>John Doe</h3>
          <p>42 Listed Courses</p>
        </div>
      </div>
    </div>
  </div>
}