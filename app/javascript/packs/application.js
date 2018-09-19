/* eslint no-console:0 */
import ReactOnRails from 'react-on-rails';
import App from '../bundles/App';
import SearchStocks from '../bundles/SearchStocks/components/SearchStocks';
import StocksList from '../bundles/SearchStocks/components/StocksList';
import SearchFriends from '../bundles/Friends/components/SearchFriends';
import SignIn from '../bundles/Authentication/components/SignIn';

ReactOnRails.register({
  App,
  SearchStocks,
  StocksList,
  SearchFriends,
  SignIn
});
