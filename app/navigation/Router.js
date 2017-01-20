import {
  createRouter,
} from '@exponent/ex-navigation';

import HomeScreen from '../screens/HomeScreen';
import StatsScreen from '../screens/StatsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RootNavigation from './RootNavigation';
import TrackLocation from '../screens/TrackLocation';
import Social from '../screens/SocialScreen';
import Login from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import Messages from '../screens/Messages';
import MatchScreen from '../screens/MatchScreen';
import LogScreen from '../screens/LogScreen';
import PrivateMessage from '../screens/PrivateMessage';
import ProfileSettings from '../screens/ProfileSettings';
import MatchDetails from '../screens/MatchDetails';
import LocationDetails from '../screens/LocationDetails';
import NotificationSettings from '../screens/NotificationSettings';
import HelpCenter from '../screens/HelpCenter';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import ReportProblems from '../screens/ReportProblems';

export default createRouter(() => ({
  home: () => HomeScreen,
  stats: () => StatsScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
  tracklocation: () => TrackLocation,
  social: () => Social,
  login: () => Login,
  signup: () => SignupScreen,
  messages: () => Messages,
  matches: () => MatchScreen,
  logs: () => LogScreen,
  privatemsg: () => PrivateMessage,
  profilesettings: () => ProfileSettings,
  matchdetails: () => MatchDetails,
  locationdetails: () => LocationDetails,
  notification: () => NotificationSettings,
  helpcenter: () => HelpCenter,
  privacypolicy: () => PrivacyPolicy,
  reportproblems: () => ReportProblems,
}));
