import React from "react";
import { useState, useEffect } from "react";

const Quotes = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const url = "https://type.fit/api/quotes";

  // another quote url
  // const old_url = "https://api.quotable.io/random";

  useEffect(() => {
    const quoteFetch = async () => {
      if (navigator.onLine) {
        try {
          const response = await fetch(url);
          const dataUnparsed = await response.json();
          const data = await dataUnparsed[Math.floor(Math.random() * 1642)];
          if (data.text && data.author) {
            setQuote(`" ${data.text} "`);
            setAuthor(`- ${data.author ? data.author : "Anonymous"}`);
          }
        } catch (err) {}
      } else {
        setAuthor("Quote of the day");
        setQuote("");
      }
    };

    quoteFetch();
  }, []);

  return (
    <div className="quoteContainer">
      <div className="quoteBorder">
        <p className="quote">{quote}</p>
        <strong className="author">{author}</strong>
      </div>
    </div>
  );
};

export default Quotes;
