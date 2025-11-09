/**
 * Configuration of known Coinbase Exchange API endpoints
 */
"use strict"

export const KNOWN_ENDPOINTS = [
  // Accounts
  "exchangerestapi_getaccounts",
  "exchangerestapi_getaccount",
  "exchangerestapi_getaccountledger",
  "exchangerestapi_getaccountholds",
  "exchangerestapi_getaccounttransfers",
  
  // Orders
  "exchangerestapi_postorders",
  "exchangerestapi_deleteorders",
  "exchangerestapi_deleteorder",
  "exchangerestapi_getorders",
  "exchangerestapi_getorder",
  
  // Fills
  "exchangerestapi_getfills",
  
  // Limits
  "exchangerestapi_getexchangelimits",
  
  // Deposits
  "exchangerestapi_postdepositcoinbaseaccount",
  "exchangerestapi_postdepositpaymentmethod",
  "exchangerestapi_getdeposits",
  "exchangerestapi_getdeposit",
  "exchangerestapi_getpaymentmethods",
  
  // Withdrawals
  "exchangerestapi_postwithdrawcoinbaseaccount",
  "exchangerestapi_postwithdrawcrypto",
  "exchangerestapi_postwithdrawpaymentmethod",
  "exchangerestapi_postwithdrawfeeestimate",
  "exchangerestapi_getwithdrawals",
  "exchangerestapi_getwithdrawal",
  
  // Stablecoins
  "exchangerestapi_poststablecoinconversions",
  
  // Payment Methods
  "exchangerestapi_getcoinbaseaccounts",
  
  // Fees
  "exchangerestapi_getfees",
  
  // Reports
  "exchangerestapi_postreports",
  "exchangerestapi_getreport",
  
  // Profiles
  "exchangerestapi_getprofiles",
  "exchangerestapi_getprofile",
  "exchangerestapi_postprofile",
  "exchangerestapi_putprofile",
  "exchangerestapi_deleteprofile",
  
  // Margin (deprecated but may still be documented)
  "exchangerestapi_getmarginprofileinformation",
  "exchangerestapi_getbuyingpower",
  "exchangerestapi_getwithdrawalpower",
  "exchangerestapi_getallwithdrawalpower",
  "exchangerestapi_getexitstatus",
  "exchangerestapi_getliquidationhistory",
  "exchangerestapi_getpositionrefreshfees",
  "exchangerestapi_getstatus",
  
  // Oracle
  "exchangerestapi_getcryptocurrencies",
  
  // Products (Public)
  "exchangerestapi_getproducts",
  "exchangerestapi_getproduct",
  "exchangerestapi_getproductbook",
  "exchangerestapi_getproductcandles",
  "exchangerestapi_getproductstats",
  "exchangerestapi_getproductticker",
  "exchangerestapi_getproducttrades",
  
  // Currencies (Public)
  "exchangerestapi_getcurrencies",
  "exchangerestapi_getcurrency",
  
  // Time (Public)
  "exchangerestapi_gettime",
  
  // Conversions
  "exchangerestapi_postconversions",
  "exchangerestapi_getconversion",
  
  // Address Book
  "exchangerestapi_getaddressbook",
  "exchangerestapi_postaddresses",
  "exchangerestapi_deleteaddress",
  
  // Wallets
  "exchangerestapi_getwallets",
  "exchangerestapi_getwallet",
  
  // Wrapped Assets
  "exchangerestapi_getwrappedassets",
  "exchangerestapi_getwrappedasset",
  "exchangerestapi_getstakedholdingsperstakingproduct",
  "exchangerestapi_poststakewrap",
  "exchangerestapi_postunstakewrap",
  "exchangerestapi_getstakewrap",
  "exchangerestapi_getwrapconversionrate"
]
