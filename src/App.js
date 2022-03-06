import { ethers } from "ethers";
import { useEffect, useState } from "react";
import MintContractAbi from "./utils/Mint.json";
import "./App.css";

const OPENSEA_LINK =
    "https://testnets.opensea.io/collection/squarenft-hgyknjmrw4";
const TOTAL_MINT_COUNT = 50;

const mintContract = "0x011d1Fe165b5737B5f8DB02D0DCD9408B1B6882A";

function App() {
    const [userAcc, setUserAcc] = useState();
    const [connected, setConnected] = useState(false);
    const [message, setMessage] = useState("");

    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;

        if (!ethereum) {
            return;
        } else {
            console.log("We have the ethereum object", ethereum);
        }

        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
            const account = accounts[0];
            setUserAcc(account);

            setupEventListener();
        } else {
            console.log("No authorized account found");
        }
    };

    const connectWallet = async () => {
        try {
            const { ethereum } = window;

            if (!ethereum) {
                alert("Get metamask!");
                return;
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            console.log("Connected", accounts[0]);
            setUserAcc(accounts[0]);
            setConnected(true);
            setupEventListener();
        } catch (error) {
            console.log(error);
        }
    };

    const setupEventListener = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    mintContract,
                    MintContractAbi.abi,
                    signer
                );

                contract.on("NewNFTMinted", (from, tokenId) => {
                    console.log(from, tokenId.toNumber());
                    alert(
                        `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${mintContract}/${tokenId.toNumber()}`
                    );
                });

                console.log("Setup event listener!");
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const mintNft = async () => {
        try {
            const { ethereum } = window;

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(
                    mintContract,
                    MintContractAbi.abi,
                    signer
                );

                setMessage("Waiting on transaction success... ⏳");
                let mintTxn = await contract.mintYourNft();

                setMessage("Minting your nft... ⏳");
                await mintTxn.wait();

                console.log(
                    `Mined, see transaction: https://rinkeby.etherscan.io/tx/${mintTxn.hash}`
                );
                setMessage("Nft minted, congrats! 🥳");
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <div className="App">
            <nav className="nav">
                <h1>Nft collection</h1>
                <button onClick={connectWallet} className="btn-connect">
                    {connected === true && userAcc.length > 0
                        ? "Connected: " +
                          String(userAcc).substring(0, 6) +
                          "..." +
                          String(userAcc).substring(38)
                        : "Connect Wallet"}
                </button>
            </nav>

            <div className="content">
                <h1>My nft collection</h1>
                <h3>Each unique. Rare. Ready to moon! 🚀</h3>
                <button onClick={mintNft}>Mint</button>
            </div>

            <h2 className="message">{message}</h2>
            <a href={OPENSEA_LINK} className="link">
                <p>OpenSea collection</p>
            </a>
        </div>
    );
}

export default App;
