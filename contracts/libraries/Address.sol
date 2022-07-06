// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed

     *  We could also use {msg.sender == tx.origin} bcz this is not a very safe method
     */
    function isContract(address account) internal view returns (bool) {
        return account.code.length > 0;
    }
}