import React, { useState } from "react";

import Editor from "@monaco-editor/react";

type CodeEditorWindowProps = {
  onChange: (newValue: string) => void;
  language: { value: string };
  code: string;
  theme: { value: string };
};

const CodeEditorWindow: React.FC<CodeEditorWindowProps> = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setValue(value);
      onChange(value);
    }
  };

  /*const handleEditorChange = (value: string) => {
    setValue(value);
    //onChange("code", value);
    onChange(value);
  };*/

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="85vh"
        width={`100%`}
        language={language.value || "javascript"}
        value={value}
        theme={theme.value}
        defaultValue="// some comment"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
