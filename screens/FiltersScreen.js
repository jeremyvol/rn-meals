import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';

import COLORS from '../constants/colors';
import HeaderButton from '../components/HeaderButton';

import { setFilters } from '../store/actions/meals';

const FilterSwitch = props => {
  return (
    <View style={styles.filterContainer}>
      <Text>{props.label}</Text>
      <Switch
        trackColor={{
          true: COLORS.primary
        }}
        thumbColor={Platform.OS === 'android' ? COLORS.primary : ''}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const FiltersScreen = props => {
  const { navigation } = props;

  const [isGlutenFree, setIsGlutenFree] = useState(false);
  const [isLactoseFree, setIsLactoseFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegetarian, setIsVegetarian] = useState(false);

  const dispatch = useDispatch();

  // const saveFilters = useCallback(() => {
  //   const appliedFilters = {
  //     glutenFree: isGlutenFree,
  //     lactoseFree: isLactoseFree,
  //     vegan: isVegan,
  //     vegetarian: isVegetarian
  //   };
  //   dispatch( setFilters( appliedFilters ) );

  //   //calling CategoriesScreen after saving the filters
  //   navigation.navigate( 'Categories' );
  // }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  // useEffect(() => {
  //   navigation.setParams({ save: saveFilters });
  // }, [saveFilters]);

  // alternative with no save button
  const saveGluten = useCallback(
    newValue => {
      setIsGlutenFree(newValue);
    },
    [isGlutenFree, dispatch]
  );

  const saveLactose = useCallback(
    newValue => {
      setIsLactoseFree(newValue);
    },
    [isLactoseFree, dispatch]
  );

  const saveVegan = useCallback(
    newValue => {
      setIsVegan(newValue);
    },
    [isVegan, dispatch]
  );

  const saveVegetarian = useCallback(
    newValue => {
      setIsVegetarian(newValue);
    },
    [isVegetarian, dispatch]
  );

  useEffect(() => {
    const appliedFilters = {
      glutenFree: isGlutenFree,
      lactoseFree: isLactoseFree,
      vegan: isVegan,
      vegetarian: isVegetarian
    };
    dispatch(setFilters(appliedFilters));
  }, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters / Restrictions</Text>
      <FilterSwitch
        label="Gluten-free"
        state={isGlutenFree}
        onChange={saveGluten}
        // onChange={newValue => {
        //   setIsGlutenFree(newValue);
        // }}
      />
      <FilterSwitch
        label="Lactose-free"
        state={isLactoseFree}
        onChange={saveLactose}
        // onChange={newValue => {
        //   setIsLactoseFree(newValue);
        // }}
      />
      <FilterSwitch
        label="Vegan"
        state={isVegan}
        onChange={saveVegan}
        // onChange={newValue => {
        //   setIsVegan(newValue);
        // }}
      />
      <FilterSwitch
        label="Vegetarian"
        state={isVegetarian}
        onChange={saveVegetarian}
        // onChange={newValue => {
        //   setIsVegetarian(newValue);
        // }}
      />
    </View>
  );
};

FiltersScreen.navigationOptions = navData => {
  return {
    HeaderTitle: 'Filter Meals',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
    // headerRight: (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Save"
    //       iconName={Platform.OS === 'android' ? 'md-save' : 'ios-save'}
    //       onPress={navData.navigation.getParam('save')}
    //     />
    //   </HeaderButtons>
    // )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    margin: 20,
    textAlign: 'center'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    marginVertical: 15
  }
});

export default FiltersScreen;
