
import React,{useState,useEffect} from 'react'
const data = [{id: 0, label: "Istanbul, TR (AHL)"}, {id: 1, label: "Paris, FR (CDG)"}];

export default () => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItem] = useState(data);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const toggledropdown = () => setOpen(!isOpen);
  
  const handleItemClick = (id) => {
    selectedItem == id ? setSelectedItem(null) : setSelectedItem(id);
  }
  
  return (
    <div className='dropdown-cst'>
      <button className='dropdown-cst-header' onClick={toggledropdown}>
      <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M23.7379 2.80052L10.493 6.12026C9.46198 6.43573 8.52417 6.99937 7.7618 7.76175C6.99942 8.52412 6.43578 9.46193 6.12031 10.4929L2.79954 23.7337C1.79928 27.7337 4.25296 30.2008 8.2705 29.2046L21.5102 25.9014C22.5393 25.5818 23.4752 25.0167 24.2372 24.2547C24.9992 23.4927 25.5643 22.5568 25.8839 21.5277L29.1995 8.26633C30.1998 4.26633 27.7327 1.80026 23.7379 2.80052Z" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  <path d="M20.6667 16C20.6667 16.923 20.393 17.8253 19.8802 18.5928C19.3674 19.3602 18.6385 19.9584 17.7858 20.3116C16.933 20.6648 15.9947 20.7572 15.0894 20.5772C14.1841 20.3971 13.3526 19.9526 12.6999 19.3C12.0472 18.6473 11.6028 17.8157 11.4227 16.9105C11.2426 16.0052 11.335 15.0668 11.6883 14.2141C12.0415 13.3613 12.6396 12.6325 13.4071 12.1197C14.1745 11.6069 15.0768 11.3332 15.9998 11.3332C17.2376 11.3332 18.4246 11.8248 19.2998 12.7C20.175 13.5752 20.6667 14.7623 20.6667 16Z" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
</svg>

    <p>Browse</p>
      <div className='jfsid-sdsn'>
      <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M19.9201 8.95001L13.4001 15.47C13.028 15.8398 12.5247 16.0474 12.0001 16.0474C11.4755 16.0474 10.9722 15.8398 10.6001 15.47L4.08008 8.95001" stroke="#A2A2A2" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
</svg>
      </div>

      </button>
      <div className={`dropdown-cst-body ${isOpen && 'open'}`}>
        {items.map(item => (
          <div className="dropdown-cst-item" onClick={e => handleItemClick(e.target.id)} id={item.id}>
            <span className={`dropdown-cst-item-dot ${item.id == selectedItem && 'selected'}`}>• </span>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}

 