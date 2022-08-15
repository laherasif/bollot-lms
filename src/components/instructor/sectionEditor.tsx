import dynamic from "next/dynamic";
import React, { useEffect, useRef, useState } from "react";
// import Context from '@ckeditor/ckeditor5-core/src/context';
// import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
// import 
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

function Editor({ onChange, editorLoaded, name, value }: any) {
  // const editorRef = useRef();
  // const { CKEditor, ClassicEditor }:any = editorRef.current || {};

  const editorRef = useRef()
  // const [ editorLoaded, setEditorLoaded ] = useState( false )
  const { CKEditor, ClassicEditor }: any = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
    }
    // setEditorLoaded( true )
  }, [])

  function uploadAdapter(loader: any) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file: any) => {
            body.append("image", file);
            fetch(`${API_URL}/${UPLOAD_ENDPOINT}`, {
              method: "post",
              body: body
            })
              .then((res => res.json()))
              .then((res) => {
                resolve({ default: `${API_URL}/${res.filename}` })
              })
              .catch((err) => {
                reject(err);
              })
          })
        })
      }
    }
  }
  function uploadPlugin(editor: any) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader: any) => {
      return uploadAdapter(loader);
    };
  }

  return (
    <div>
      {editorLoaded ? (
        <CKEditor
          type=""
          name={name}
          editor={ClassicEditor}
          style={{ height: "10%" }}
          data={value}

          config={{
            extraPlugins: [uploadPlugin],
            // plugins: [ Bold,],
            // toolbar: ['heading' ,'bold', 'italic', 'link', 'undo', 'redo', 'numberedList', 'bulletedList'  , 'insertTable'],
            toolbar: [
              'heading', '|',
              'fontfamily', 'fontsize', '|',
              'alignment', '|',
              'fontColor', 'fontBackgroundColor', '|',
              'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
              'link', '|',
              'outdent', 'indent', '|',
              'bulletedList', 'numberedList', 'todoList', '|',
              'code', 'codeBlock', '|',
              'insertTable', '|',
              // 'uploadImage', 'blockQuote', '|',
              'undo', 'redo'
            ]
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            if (event) {
              onChange(data);
            }
          }}
        />
      ) : (
        <div>Editor loading</div>
      )}
    </div>
  );
}

export default Editor;