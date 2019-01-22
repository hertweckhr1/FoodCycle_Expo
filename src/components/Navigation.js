import React, {Component} from 'react';
import { Text, View, Image } from 'react-native';
import { Icon } from 'native-base'
import { HeaderBackButton, createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from 'react-navigation';
import { DonorDonationDetail, DoneeDonationDetail, DonorDonationsToday,
  FindByProduct, DoneeSchedule, FindNearYou, DonationSchedule,
  Info, WelcomeScreen, Settings, UserDetails, AddDonation } from '../screens'
import SignUpForm from './SignUpForm';
import NavigationService from './NavigationService';


// clean this up so it is a function, and only have to input name into function
class Navigation extends Component {

  render() {
    // console.log(JSON.stringify({test: true, props: this.props}, null, 2))
    const screenProps = {
      loginUserCallback: this.props.screenProps.loginUserCallback,
      donations: this.props.screenProps.donations,
      user: this.props.screenProps.user,
      users: this.props.screenProps.users,
      addDonationCallback: this.props.screenProps.addDonationCallback,
      updateDonationCallback: this.props.screenProps.updateDonationCallback,
      error: this.props.screenProps.error
    }
    return <AppContainer
      ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef)
      }}
      screenProps={screenProps} />;
  }
}

export default Navigation;


const InfoTabBarIcon = ({ tintColor }) => (
  <Icon name="information-circle-outline" size={20} color={tintColor} />
);
const UserDetailsTabBarIcon = ({ tintColor }) => (
  <Icon name="contact" size={20} color={tintColor} />
);
const DonationScheduleTabBarIcon = ({ tintColor }) => (
  <Icon name="list-box" size={20} color={tintColor} />
);
const AddDonationTabBarIcon = ({ tintColor }) => (
  <Icon name="add-circle" size={20} color={tintColor} />
);
const SettingsTabBarIcon = ({ tintColor }) => (
  <Icon name="construct" size={20} color={tintColor} />
);
const SearchTabBarIcon = ({ tintColor }) => (
  <Icon name="search" size={20} color={tintColor} />
);


// donortab
const TabNavigator = createBottomTabNavigator({
    UserDetails: {
      screen: UserDetails,
      navigationOptions: {
        title: 'User Details',
        tabBarIcon: UserDetailsTabBarIcon
      }
    },
    AddDonation: {
      screen: AddDonation,
      navigationOptions: {
        title: 'Add Donation',
        tabBarIcon: AddDonationTabBarIcon
      }
    },
    Info: {
      screen:Info,
      navigationOptions: {
        title: 'Q & A',
        tabBarIcon: InfoTabBarIcon
      }
    },
    DonationSchedule: {
      screen: DonationSchedule,
      navigationOptions: {
        title: 'My Donations',
        tabBarIcon: DonationScheduleTabBarIcon
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: 'Settings',
        tabBarIcon: SettingsTabBarIcon
      }
    },
  },
  {
      tabBarOptions: {
        activeTintColor: 'tomato'
      }
    }
);

// doneetab
const DoneeTabNavigator = createBottomTabNavigator({
    FindNearYou: {
      screen: FindNearYou,
      navigationOptions: {
        title: 'Near You',
        tabBarIcon: UserDetailsTabBarIcon
      }
    },
    FindByProduct: {
      screen: FindByProduct,
      navigationOptions: {
        title: 'By Product',
        tabBarIcon: SearchTabBarIcon
      }
    },
    Info: {
      screen:Info,
      navigationOptions: {
        title: 'Q & A',
        tabBarIcon: InfoTabBarIcon
      }
    },
    DoneeSchedule: {
      screen: DoneeSchedule,
      navigationOptions: {
        title: 'History',
        tabBarIcon: DonationScheduleTabBarIcon
      }
    },
    Settings: {
      screen: Settings,
      navigationOptions: {
        title: 'Settings',
        tabBarIcon: SettingsTabBarIcon
      }
    },
  },
  {
      tabBarOptions: {
        activeTintColor: 'tomato'
      }
    }
);

const StackNavigator = createStackNavigator({
    TabNavigator: TabNavigator,
    SignUp: {
      screen: SignUpForm,
      navigationOptions: ({navigation}) => ({ //don't forget parentheses around the object notation
        title: 'SignUp',
        headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Welcome')} />
      })
    },
    DonorDonationsToday: {
      screen: DonorDonationsToday,
      navigationOptions: ({navigation}) => ({ //don't forget parentheses around the object notation
        title: 'SignUp',
        headerLeft: <HeaderBackButton onPress={() => navigation.navigate('FindNearYou')} />
      })
    },
    DoneeDonationDetail: {
      screen: DoneeDonationDetail,
      navigationOptions: ({navigation}) => ({ //don't forget parentheses around the object notation
        title: 'SignUp',
        headerLeft: <HeaderBackButton onPress={() => navigation.navigate('FindByProduct')} />
      })
    },
    DonorDonationDetail: {
      screen: DonorDonationDetail,
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          borderBottomColor: '#9ACD32',
          backgroundColor: 'black',
          borderBottomWidth: 4,
          height: 70
        },
        headerRight: (
          <Icon
            style={{ paddingRight: 30, color: 'white' }}
            onPress={() => navigation.openDrawer('Home')}
            name="log-out"
            size={30}
          />
        ),
        headerTitle: <Image style={{width: 100, resizeMode:'contain'}}
                    source={require('../assets/white-logo.png')} />,
      };
    }
  }
);

const DoneeStackNavigator = createStackNavigator({
    DoneeTabNavigator: DoneeTabNavigator,
    SignUp: {
      screen: SignUpForm,
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerStyle: {
          borderBottomColor: '#9ACD32',
          backgroundColor: 'black',
          borderBottomWidth: 4,
          height: 70
        },
        headerRight: (
          <Icon
            style={{ paddingRight: 30, color: 'white' }}
            onPress={() => navigation.openDrawer('Home')}
            name="log-out"
            size={30}
          />
        ),
        headerTitle: <Image style={{width: 100, resizeMode:'contain'}}
                    source={require('../assets/white-logo.png')} />,
      };
    }
  }
);

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen},
  Dashboard: { screen: StackNavigator },
  DoneeDashboard: {screen: DoneeStackNavigator}
});

const AppContainer = createAppContainer(AppSwitchNavigator)



// const AppContainer = createAppContainer(TabNavigator);
