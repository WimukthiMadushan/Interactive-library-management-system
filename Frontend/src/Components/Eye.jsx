import React from "react";
import { AiTwotoneEye } from "react-icons/ai";
import { AiTwotoneEyeInvisible } from "react-icons/ai";

function Eye({ visible, setVisible }) {
  return (
    <>
      {visible ? (
        <AiTwotoneEye
          className="eye-icon"
          onClick={() => setVisible(!visible)}
        />
      ) : (
        <AiTwotoneEyeInvisible
          className="eye-icon"
          onClick={() => setVisible(!visible)}
        />
      )}
    </>
  );
}

export default Eye;
