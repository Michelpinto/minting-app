import { useState } from "react";
import "./App.css";

function App() {
    const [state, setState] = useState();

    return (
        <div className="App">
            <nav className="nav">
                <h1>Nft collection</h1>
                <button className="btn-connect">Connect wallet</button>
            </nav>

            <div className="content">
                <h1>My nft collection</h1>
                <h3>Each unique. Rare. Ready to moon! 🚀</h3>
                <button>Mint</button>
            </div>
        </div>
    );
}

export default App;
