import React from "react";
import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`入力(オプション)`}
        className={classnames(
          "w-full border-b-2 border-[#232323] bg-[#1e1e1e] text-[#cccccc] p-2",
        )}
      ></textarea>
    </>
  );
};

export default CustomInput;
