import React from "react";

import "./ExchangeBanner.css";

export default function ExchangeBanner(props) {
  const { hideBanner } = props;

  return (
    <div className="ExchangeBanner">
      <p className="ExchangeBanner-text">
        Trade on GMX and win <span className="ExchangeBanner-price">$250.000</span> in prizes! Live until November 30th,{" "}
        <a
          href="https://medium.com/@gmx.io/gmx-trading-competition-win-250-000-usd-in-prizes-1346504b96f6"
          target="_blank"
          className="ExchangeBanner-link"
          rel="noreferrer"
        >
          click here
        </a>{" "}
        to learn more.
      </p>
      <span
        className="ExchangeBanner-close"
        onClick={(e) => {
          hideBanner();
        }}
      >

      </span>
    </div>
  );
}
