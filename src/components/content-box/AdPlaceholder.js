import React, { useEffect } from "react";
// import "../../style/Ad.css";

const BottomAdPlaceholder = ({ odd_id, id }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, []);

  if (window.innerWidth > 1024) {
    return (
      <div
        // style={{ display: odd_id ? "flex" : "none" }}
        className="adBottom"
        id={`adBottom_${id}`}
        aria-hidden={true}
      >
        <ins
          className="adsbygoogle"
          style={{ display: odd_id ? "block" : "none" }}
          data-ad-client="ca-pub-4918114251860863"
          data-ad-slot="7030904716"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  } else {
    return (
      <div className="adBottom" id={`adBottom_${id}`} aria-hidden={true}>
        <ins
          className="adsbygoogle"
          style={{ display: odd_id ? "block" : "none" }}
          data-ad-client="ca-pub-4918114251860863"
          data-ad-slot="7030904716"
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    );
  }
};

const SideAdPlaceholder = ({ odd_id, id }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div
      // style={{ display: odd_id ? "block" : "none" }}
      className="adSides"
      id={`adSide_${id}`}
      aria-hidden={true}
    >
      <ins
        className="adsbygoogle"
        style={{ display: odd_id ? "block" : "none" }}
        data-ad-client="ca-pub-4918114251860863"
        data-ad-slot="3277747562"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export { BottomAdPlaceholder, SideAdPlaceholder };
