/* eslint no-console:0 */
import ReactOnRails from 'react-on-rails';

import SearchStocks from '../bundles/SearchStocks/components/SearchStocks';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  SearchStocks,
});
