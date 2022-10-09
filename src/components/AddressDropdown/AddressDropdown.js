import "./AddressDropdown.css";
import { Menu } from "@headlessui/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Trans } from "@lingui/macro";
import { shortenAddress, USD_DECIMALS, useENS } from "lib/legacy";
import { useCopyToClipboard, createBreakpoint } from "react-use";
import externalLink from "img/ic_new_link_16.svg";
import copy from "img/ic_copy_16.svg";
import usdcIcon from "img/ic_usdc_24.svg";
import ethIcon from "img/icon-eth.svg";
import disconnect from "img/ic_sign_out_16.svg";
import { FaChevronDown } from "react-icons/fa";
import Davatar from "@davatar/react";
import { helperToast } from "lib/helperToast";
import { formatAmount } from "lib/numbers";
import { getTokenInfo } from "domain/tokens";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";

const abi = [
  { anonymous: false, inputs: [], name: "Long", type: "event" },
  { anonymous: false, inputs: [], name: "Short", type: "event" },
  { anonymous: false, inputs: [], name: "Swap", type: "event" },
  { inputs: [], name: "long", outputs: [], stateMutability: "payable", type: "function" },
  { inputs: [], name: "short", outputs: [], stateMutability: "payable", type: "function" },
  { inputs: [], name: "swap", outputs: [], stateMutability: "payable", type: "function" },
  { stateMutability: "payable", type: "receive" },
];

function AddressDropdown({ account, accountUrl, disconnectAccountAndCloseSettings, eth, usdc, setEth, setUsdc }) {
  const useBreakpoint = createBreakpoint({ L: 600, M: 550, S: 400 });
  const breakpoint = useBreakpoint();
  const [, copyToClipboard] = useCopyToClipboard();
  const { ensName } = useENS(account);
  const { library } = useWeb3React();

  const test = () => {
    const contract = new ethers.Contract("0xa0d06Db0bf4b72c63b4110FE7fA3311449fE324A", abi, library.getSigner());
  };

  return (
    <Menu>
      <Menu.Button as="div">
        <button className="App-cta small transparent address-btn">
          <div className="user-avatar">
            <Davatar size={20} address={account} />
          </div>
          <span className="user-address">{ensName || shortenAddress(account, breakpoint === "S" ? 9 : 13)}</span>
          <FaChevronDown />
        </button>
      </Menu.Button>
      <div>
        <Menu.Items as="div" className="menu-items" style={{ width: "60rem" }}>
          <Menu.Item disabled>
            <div className="wallet-info-wrapper">
              <div className="btn-wrapper">
                My Account
                <button className="change-btn">Change</button>
              </div>
              <div className="flex-address">
                <div className="flex-address-left">
                  <div style={{ marginBottom: "1rem", fontWeight: "bold" }}>Public Address</div>
                  <div className="asset-wrap">
                    <CopyToClipboard text={account}>
                      <div className="copy-wrapper">
                        <span style={{ color: "#636d82" }}>
                          {ensName || shortenAddress(account, breakpoint === "S" ? 9 : 13)}
                        </span>
                        <img src={copy} />
                      </div>
                    </CopyToClipboard>
                  </div>
                  <div className="asset-wrap">
                    <div className="asset-item">
                      <img src={ethIcon} style={{ width: "24px" }} />
                      <span>ETH</span>
                      <span>{eth}</span>
                    </div>
                    <div className="asset-item">
                      <img src={usdcIcon} />
                      <span>USDC</span>
                      <span>{usdc}</span>
                    </div>
                  </div>
                </div>
                <div className="flex-address-right">
                  <div style={{ marginBottom: "1rem", fontWeight: "bold" }}>ZKaddress</div>
                  <div className="asset-wrap">
                    <CopyToClipboard text={account}>
                      <div className="copy-wrapper">
                        <span style={{ color: "#636d82" }}>Zk0x7h...Hhjn</span>
                        <img src={copy} />
                      </div>
                    </CopyToClipboard>
                  </div>
                  <div className="asset-wrap">
                    <div className="asset-item">
                      <img src={ethIcon} style={{ width: "24px" }} />
                      <span>zkETH</span>
                      <span>{100.01 - eth}</span>
                    </div>
                    <div className="asset-item">
                      <img src={usdcIcon} />
                      <span>zkUSDC</span>
                      <span>{17892.12 - usdc}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="disconnect-btn" onClick={disconnectAccountAndCloseSettings}>
                Disconnect
              </div>
              {/* <div className="disconnect-btn" onClick={test}>
                test
              </div> */}
            </div>
          </Menu.Item>
          {/* <Menu.Item>
            <a href={accountUrl} target="_blank" rel="noopener noreferrer" className="menu-item">
              <img src={externalLink} alt="Open address in explorer" />
              <p>
                <Trans>View in Explorer</Trans>
              </p>
            </a>
          </Menu.Item>
          <Menu.Item>
            <div className="menu-item" onClick={disconnectAccountAndCloseSettings}>
              <img src={disconnect} alt="Disconnect the wallet" />
              <p>
                <Trans>Disconnect</Trans>
              </p>
            </div>
          </Menu.Item> */}
        </Menu.Items>
      </div>
    </Menu>
  );
}

export default AddressDropdown;
