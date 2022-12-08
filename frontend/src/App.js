import React from 'react';
import Loader from './components/Loader';
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import RegisterScreen from './Screens/RegisterScreen';
import LoginScreen from './Screens/LoginScreen';
import EditUserProfileScreen from './Screens/EditUserProfileScreen';
import HomeScreen from './Screens/HomeScreen';
import MyPostsScreens from './Screens/MyPostsScreens';
import LikedPostsScreen from './Screens/LikedPostsScreen';
import BookmarkedPostsScreen from './Screens/BookmarkedPostsScreen'
import MediaPostsScreen from './Screens/MediaPostsScreen';
import FollowingScreen from './Screens/FollowingScreen';
import FollowersScreen from './Screens/FollowersScreen';
import SearchScreen from './Screens/SearchScreen';
import PostDetailsScreen from './Screens/PostDetailsScreen';
import UserDetailsScreen from './Screens/UserDetailsScreen';

const App = () => {
  return (
    <Router>

      <main className="body">
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/home" component={HomeScreen} />
        <Route exact path="/myPosts" component={MyPostsScreens} />
        <Route exact path="/liked" component={LikedPostsScreen} />
        <Route exact path="/bookmarks" component={BookmarkedPostsScreen} />
        <Route exact path="/media" component={MediaPostsScreen} />
        <Route exact path="/register" component={RegisterScreen} />
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/edit" component={EditUserProfileScreen} />
        <Route exact path='/following' component={FollowingScreen} />
        <Route exact path="/followers" component={FollowersScreen} />
        <Route exact path="/search/:keyword" component={SearchScreen} />
        <Route exact path="/postDetails/:id" component={PostDetailsScreen} />
        <Route exact path="/userDetails/:id" component={UserDetailsScreen} />

      </main>

    </Router>


  );
}

export default App;
