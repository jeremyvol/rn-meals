import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import COLORS from '../constants/colors';

// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import { createDrawerNavigator } from 'react-navigation-drawer';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoriteScreen from '../screens/FavoritesScreen';

const MealsNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: {
        headerTitle: 'Meal Categories'
      }
    },
    CategoryMeals: {
      screen: CategoryMealsScreen
    },
    MealDetail: {
      screen: MealDetailScreen
    }
  },
  {
    // initialRouteName: 'Categories',
    // mode: 'modal', // iOS only
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.primary : white
      },
      headerTintColor: Platform.OS === 'android' ? 'white' : COLORS.primary
    }
  }
);

const tabScreenConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name={
              Platform.OS === 'android' ? 'md-restaurant' : 'ios-restaurant'
            }
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: COLORS.primary
    }
  },
  Favorites: {
    screen: FavoriteScreen,
    navigationOptions: {
      tabBarIcon: tabInfo => {
        return (
          <Ionicons
            name={Platform.OS === 'android' ? 'md-star' : 'ios-star'}
            size={25}
            color={tabInfo.tintColor}
          />
        );
      },
      tabBarColor: COLORS.accent
    }
  }
};

const MealsFavTabNavigator =
  Platform.OS === 'android'
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: 'white',
        shifting: true
        // if shifting = false
        // barStyle: {
        //   backgroundColor: COLORS.primary
        // }
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          activeTintColor: COLORS.accent
        }
      });

export default createAppContainer(MealsFavTabNavigator);
