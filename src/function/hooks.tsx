
import { useRef, useEffect } from 'react';
import Swal from 'sweetalert2'
export function EmailHide({ email }: any) {
  console.log("emai;", email)
  let input = email
  let a = input.split("@");
  let b: any = a[0];
  let newstr = "";
  for (let i in b) {
    if (parseInt(i) > 4 && parseInt(i) < b.length - 1) newstr += "*";
    else newstr += b[i];
  }
  console.log(newstr + "@" + a[1]);
  return (newstr + "@" + a[1])
}


export function usePrevious<T>(value?: T) {
  const ref = useRef<T>();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export const SweetAlert = ({icon ,  text }: any ) => {
  debugger
  Swal.fire({
    icon: icon,
    text: text,
  })
}


export function add3Dots(string: string , limit: number )
{
  var dots = "...";
  if(string && string.length > limit)
  {
    // you can also use substr instead of substring
    string = string.substring(0,limit) + dots;
  }

    return string;
}



