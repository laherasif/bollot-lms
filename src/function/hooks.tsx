
import { useRef, useEffect } from 'react';
import Swal from 'sweetalert2'

// export function EmailHide({ email }: any) {
//   let input = email
//   let a = input.split("@");
//   let b: any = a[0];
//   let newstr = "";
//   for (let i in b) {
//     if (parseInt(i) > 4 && parseInt(i) < b.length - 1) newstr += "*";
//     else newstr += b[i];
//   }
//   console.log(newstr + "@" + a[1]);
//   return (newstr + "@" + a[1])
// }


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


export const generateVideoThumbnail = (file: File) => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const video = document.createElement("video");

    // this is important
    video.autoplay = true;
    video.muted = true;
    video.src = URL.createObjectURL(file);

    video.onloadeddata = () => {
      let ctx: any = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      video.pause();
      return resolve(canvas.toDataURL("image/png"));
    };
  });
};

export function convertToBase64(file: File) {
  var vp = file.getViewport(1);
  var canvas = document.createElement("canvas");
  canvas.width = canvas.height = 96;
  var scale = Math.min(canvas.width / vp.width, canvas.height / vp.height);
  // return page.render({canvasContext: canvas.getContext("2d"), viewport: page.getViewport(scale)}).promise.then(function () {
    return canvas;

  }


export const getBase64Image = (url: any) => {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx: any = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL("image/png");
  }
  img.src = url
}

export function bytesToSize(bytes: any) {
  var sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
  for (var i = 0; i < sizes.length; i++) {
    if (bytes <= 1024) {
      return bytes + ' ' + sizes[i];
    } else {
      bytes = parseFloat(bytes / 1024).toFixed(2)
    }
  }
  return bytes + ' P';
}

