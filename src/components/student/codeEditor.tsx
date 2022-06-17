import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code }:any ) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value:any) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="w-100 ">
      <Editor
        height="85vh"
        language={language}
        value={value}
        defaultValue="//Write Code here...."
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
