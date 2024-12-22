"use client";

import { TypeAnimation } from "react-type-animation";

const AuthTypingEffect = () => {
  return (
    <TypeAnimation
      sequence={[
        "Eather",
        1000,
        "Innovation + Healthcare",
        2000, // Waits 2s
        () => {},
      ]}
      wrapper="div"
      cursor={true}
      repeat={Infinity}
      style={{
        fontWeight: "bold",
        margin: "auto",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    />
  );
};

export default AuthTypingEffect;
