import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
export const UsePassword = ({
  password,
  setPassword,
  classname,
  title,
  status,
}) => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className={"passContainer" + classname}>
        <input
          title={title}
          value={password}
          placeholder={title}
          disabled={status}
          type={show ? "text" : "password"}
          className={"pass" + classname}
          onClick={(e) => e.target.select()}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label htmlFor="pass" className={"eye" + classname}>
          {show ? (
            <div
              onClick={() => {
                setShow(false);
              }}
            >
              <AiFillEye />
            </div>
          ) : (
            <div
              onClick={() => {
                setShow(true);
              }}
            >
              <AiFillEyeInvisible />
            </div>
          )}
        </label>
      </div>
    </>
  );
};
