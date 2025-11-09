/**
 * Configuration of known Coinbase INTX API endpoints
 * Based on the Coinbase International Exchange API documentation
 */
"use strict"

export const KNOWN_ENDPOINTS = [
  // Portfolios
  "intxrestapi_getportfolios",
  "intxrestapi_getportfolio",
  "intxrestapi_setportfoliomarginoverride",
  "intxrestapi_getportfoliobalances",
  "intxrestapi_getportfoliosummary",
  "intxrestapi_listportfoliopositions",
  "intxrestapi_getpositionforportfolioinstrument",
  "intxrestapi_getportfoliofills",
  "intxrestapi_getportfoliofill",

  // Instruments
  "intxrestapi_getinstruments",
  "intxrestapi_getinstrument",
  "intxrestapi_getinstrumentquote",
  "intxrestapi_getdailytradingvolumes",
  "intxrestapi_getaggregatedcandlesdata",
  "intxrestapi_gethistoricalfundingrates",

  // Orders
  "intxrestapi_createorder",
  "intxrestapi_cancelorders",
  "intxrestapi_modifyorder",
  "intxrestapi_listorders",
  "intxrestapi_getorder",

  // Fills
  "intxrestapi_getfills",

  // Transfers
  "intxrestapi_createcryptotransfer",
  "intxrestapi_createcounterpartytransfer",
  "intxrestapi_gettransfer",
  "intxrestapi_createwithdrawaltocoinbaseaccount",
  "intxrestapi_getwithdrawaltocoinbaseaccountinformation",
  "intxrestapi_listtransfers",

  // Assets
  "intxrestapi_getassets",
  "intxrestapi_getasset",
  "intxrestapi_getsupportednetworksperasset",

  // Fee Rate Tiers
  "intxrestapi_getfeeratetiers"
]
