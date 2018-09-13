/* eslint no-console:0 */
import ReactOnRails from 'react-on-rails';

import SearchStocks from '../bundles/SearchStocks/components/SearchStocks';
import StocksList from '../bundles/SearchStocks/components/StocksList';

import SearchFriends from '../bundles/Friends/components/SearchFriends';

import SignIn from '../bundles/Authentication/components/SignIn';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  SearchStocks,
  StocksList,
  SearchFriends,
  SignIn
});
