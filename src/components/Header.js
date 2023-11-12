import React from "react";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

const Header = () => {
    return(
        <div className="header">
            <h1>Notes</h1>
            <WalletMultiButton/>
        </div>
    )
};

export default Header;