import React from "react";
import { Menu } from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";
import cx from "classnames";
import "./ChartTokenSelector.css";
import { LONG, SHORT, SWAP } from "lib/legacy";
import { getTokens, getWhitelistedTokens } from "config/tokens";

export default function ChartTokenSelector(props) {
  const { chainId, selectedToken, onSelectToken, swapOption } = props;

  const isLong = swapOption === LONG;
  const isShort = swapOption === SHORT;
  const isSwap = swapOption === SWAP;

  let options = getTokens(chainId);
  const whitelistedTokens = getWhitelistedTokens(chainId);
  const indexTokens = whitelistedTokens.filter((token) => !token.isStable && !token.isWrapped);
  const shortableTokens = indexTokens.filter((token) => token.isShortable);

  if (isLong) {
    options = indexTokens;
  }
  if (isShort) {
    options = shortableTokens;
  }

  const onSelect = async (token) => {
    onSelectToken(token);
  };

  var value = selectedToken;

  return (
    <Menu>
      <Menu.Button as="div" disabled={isSwap}>
        <button className={cx("App-cta small transparent chart-token-selector", { "default-cursor": isSwap })}>
          <span className="chart-token-selector--current">zkETH / zkDAI</span>
          {!isSwap && <FaChevronDown />}
        </button>
      </Menu.Button>
      <div className="chart-token-menu">
       
      </div>
    </Menu>
  );
}
