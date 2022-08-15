import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, theme , code , classname }:any ) => {
  const [value, setValue] = useState(code || "");
  const handleEditorChange = (value:any) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="w-100 ">
      <Editor
        height="50vh"
        language={language}
        value={code }
        theme={theme}
        defaultValue="Write Code here...."
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
