/**
 * Test file to verify query parameters extraction
 */
const fs = require('fs')
const path = require('path')
const { scrapeApiDocumentation } = require('../../src/coinbase/exchange/scraper')
const { processAuthSection, processRequestParams } = require('../../src/processors/formatters')
const { generateMarkdownDocument } = require('../../src/processors/formatters')

// Sample HTML content (replace with your sample if needed)
const sampleHtml = `
<div id="path-params"><div data-testid="content-section" class="cds-flex-f1g67tkn cds-column-ci8mx7v cds-2-_115h1mf cds-1-_9w3lns cds-2-_8lqlrb"><h3 class="cds-typographyResets-t1xhpuq2 cds-title3-t37r1y cds-foreground-f1yzxzgu cds-transition-txjiwsi cds-start-s1muvu8a">Query Params</h3><div class="cds-flex-f1g67tkn cds-column-ci8mx7v"><div class="paramItem_Izrs"><div class="paramContent_MHRX"><div><div class="paramHeader_zTjK"><label class="paramName_MlmJ">profile_id</label><div class="paramType_HWMI">string</div></div><div class="paramDescription_Jrcs"><p class="cds-typographyResets-t1xhpuq2 cds-body-bb7l4gg cds-foreground-f1yzxzgu cds-transition-txjiwsi cds-start-s1muvu8a paragraph_nrmP">Filter results by a specific profile_id</p></div></div><div class="paramInput_JdNY"><input class="formInput_Yf69" name="profile_id" type="text" min="" max="" value=""></div></div></div><div class="paramItem_Izrs"><div class="paramContent_MHRX"><div><div class="paramHeader_zTjK"><label class="paramName_MlmJ">product_id</label><div class="paramType_HWMI">string</div></div><div class="paramDescription_Jrcs"><p class="cds-typographyResets-t1xhpuq2 cds-body-bb7l4gg cds-foreground-f1yzxzgu cds-transition-txjiwsi cds-start-s1muvu8a paragraph_nrmP">Filter results by a specific product_id</p></div></div><div class="paramInput_JdNY"><input class="formInput_Yf69" name="product_id" type="text" min="" max="" value=""></div></div></div><div class="paramItem_Izrs"><div class="paramContent_MHRX"><div><div class="paramHeader_zTjK"><label class="paramName_MlmJ">sortedBy</label><div class="paramType_HWMI">string</div></div><div class="paramDescription_Jrcs"><p class="cds-typographyResets-t1xhpuq2 cds-body-bb7l4gg cds-foreground-f1yzxzgu cds-transition-txjiwsi cds-start-s1muvu8a paragraph_nrmP">Sort criteria for results.</p></div></div><div class="paramInput_JdNY"><div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary  css-wp3bhj"><div tabindex="0" role="combobox" aria-controls=":rj1:" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="prop-sortedBy-select" id="prop-sortedBy-select" class="MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb">created_at</div><input aria-invalid="false" aria-hidden="true" tabindex="-1" class="MuiSelect-nativeInput css-1k3x8v3" value="created_at"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined css-1636szt" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon"><path d="M7 10l5 5 5-5z"></path></svg><fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac"><legend class="css-ihdtdm"><span class="notranslate">&ZeroWidthSpace;</span></legend></fieldset></div></div></div></div><div class="paramItem_Izrs"><div class="paramContent_MHRX"><div><div class="paramHeader_zTjK"><label class="paramName_MlmJ">sorting</label><div class="paramType_HWMI">string</div></div><div class="paramDescription_Jrcs"><p class="cds-typographyResets-t1xhpuq2 cds-body-bb7l4gg cds-foreground-f1yzxzgu cds-transition-txjiwsi cds-start-s1muvu8a paragraph_nrmP">Ascending or descending order, by <code>sortedBy</code></p></div></div><div class="paramInput_JdNY"><div class="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-colorPrimary  css-wp3bhj"><div tabindex="0" role="combobox" aria-controls=":rj2:" aria-expanded="false" aria-haspopup="listbox" aria-labelledby="prop-sorting-select" id="prop-sorting-select" class="MuiSelect-select MuiSelect-outlined MuiInputBase-input MuiOutlinedInput-input css-qiwgdb">desc</div><input aria-invalid="false" aria-hidden="true" tabindex="-1" class="MuiSelect-nativeInput css-1k3x8v3" value="desc"><svg class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiSelect-icon MuiSelect-iconOutlined css-1636szt" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowDropDownIcon"><path d="M7 10l5 5 5-5z"></path></svg><fieldset aria-hidden="true" class="MuiOutlinedInput-notchedOutline css-igs3ac"><legend class="css-ihdtdm"><span class="notranslate">&ZeroWidthSpace;</span></legend></fieldset></div></div></div></div><div class="paramItem_Izrs"><div class="paramContent_MHRX"><div><div class="paramHeader_zTjK"><label class="paramName_MlmJ">limit</label><div class="paramType_HWMI">int64</div><div class="paramRequired_Dtof">required</div></div><div class="paramDescription_Jrcs"><p class="cds-typographyResets-t1xhpuq2 cds-body-bb7l4gg cds-foreground-f1yzxzgu cds-transition-txjiwsi cds-start-s1muvu8a paragraph_nrmP">Limit on number of results to return.</p></div></div><div class="paramInput_JdNY"><input class="formInput_Yf69" name="limit" type="number" min="" max="" required="" value="100"></div></div></div></div></div></div>
`

// Sample path params HTML content
const samplePathParamsHtml = `
<div id="path-params"><div data-testid="content-section" class="cds-flex-f1g67tkn cds-column-ci8mx7v cds-2-_115h1mf cds-1-_9w3lns cds-2-_8lqlrb"><h3 class="cds-typographyResets-t1xhpuq2 cds-title3-t37r1y cds-foreground-f1yzxzgu cds-transition-txjiwsi cds-start-s1muvu8a">Path Params</h3><div class="cds-flex-f1g67tkn cds-column-ci8mx7v"><div class="paramItem_Izrs"><div class="paramContent_MHRX"><div><div class="paramHeader_zTjK"><label class="paramName_MlmJ">order_id</label><div class="paramType_HWMI">string</div><div class="paramRequired_Dtof">required</div></div><div class="paramDescription_Jrcs"><p class="cds-typographyResets-t1xhpuq2 cds-body-bb7l4gg cds-foreground-f1yzxzgu cds-transition-txjiwsi cds-start-s1muvu8a paragraph_nrmP"><code>order_id</code> is either the exchange assigned id or the client assigned client_oid. When using client_oid it must be preceded by the client: namespace.</p></div></div><div class="paramInput_JdNY"><input class="formInput_Yf69" name="order_id" type="text" min="" max="" required="" value=""></div></div></div></div></div></div>
`

// Process the HTML
console.log('Processing Query Parameters:')
const queryParamsMarkdown = processRequestParams(sampleHtml)
console.log(queryParamsMarkdown)

console.log('\nProcessing Path Parameters:')
const pathParamsMarkdown = processRequestParams(samplePathParamsHtml)
console.log(pathParamsMarkdown)

// Optionally save to a file for inspection
fs.writeFileSync(
  path.join(__dirname, 'test-query-params-output.md'),
  queryParamsMarkdown || 'No output generated'
)
fs.writeFileSync(
  path.join(__dirname, 'test-path-params-output.md'),
  pathParamsMarkdown || 'No output generated'
)
console.log('Output saved to test-query-params-output.md and test-path-params-output.md')
