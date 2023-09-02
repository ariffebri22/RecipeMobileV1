import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Icon, SearchBar, Image} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getMenu} from '../../store/action/menu';

const screenWidth = Dimensions.get('window').width;

const Items = ({
  id,
  photo,
  title,
  category,
  navigation,
  creator,
  creator_photo,
}) => {
  return (
    <ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 10,
          borderRadius: 20,
          marginLeft: 30,
        }}>
        <Image
          onPress={() => navigation.navigate('DetailMenu', {itemId: id})}
          style={{height: 100, width: 100, borderRadius: 10}}
          source={{uri: photo}}
        />
        <View
          style={{
            flexDirection: 'column',
            height: '100%',
            marginLeft: 10,
          }}>
          <Text
            onPress={() => navigation.navigate('DetailMenu', {itemId: id})}
            style={{fontSize: 16, fontWeight: 'bold'}}>
            {title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text>{category}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
            }}>
            <Image
              source={{
                uri: creator_photo !== null ? creator_photo : ImgProfile,
              }}
              style={{height: 28, width: 28, borderRadius: 50}}
            />
            <Text style={{marginLeft: 5}}>{creator}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const SearchMenu = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchMenu, setSearchMenu] = useState('');
  const [recipes, setRecipes] = useState(null);
  const {getMenuReducers} = useSelector(state => state);
  const {data, messageError, isLoading, isSuccess, isError} = getMenuReducers;
  const [currentPage, setCurrentPage] = useState(1);
  const [focusedItem, setFocusedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categoryCounts, setCategoryCounts] = useState({});
  const [allRecipes, setAllRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(getMenu());
  }, []);

  const filterAndPaginateRecipes = (searchText, page) => {
    let filteredData = allRecipes;

    if (searchText) {
      filteredData = filteredData.filter(item =>
        item.title.toLowerCase().includes(searchText.toLowerCase()),
      );
    }

    if (selectedCategory !== 'All') {
      filteredData = filteredData.filter(
        item => item.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    setRecipes(paginatedData);
    setCurrentData(paginatedData);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);

      if (selectedCategory === 'All') {
        const startIndex = (currentPage - 2) * itemsPerPage;
        const endIndex = (currentPage - 1) * itemsPerPage;
        const previousData = allRecipes.slice(startIndex, endIndex);
        setRecipes(previousData);
        setCurrentData(previousData);
      } else {
        const startIndex = (currentPage - 2) * itemsPerPage;
        const endIndex = (currentPage - 1) * itemsPerPage;
        const previousData = allRecipes
          .filter(
            item =>
              item.category.toLowerCase() === selectedCategory.toLowerCase(),
          )
          .slice(startIndex, endIndex);
        setRecipes(previousData);
        setCurrentData(previousData);
      }
    }
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(
      (searchMenu ? totalItems : allRecipes.length) / itemsPerPage,
    );
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);

      if (selectedCategory === 'All') {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = Math.min((currentPage + 1) * itemsPerPage, totalItems);
        const nextData = allRecipes.slice(startIndex, endIndex);
        setRecipes(nextData);
        setCurrentData(nextData);
      } else {
        const startIndex = currentPage * itemsPerPage;
        const endIndex = Math.min((currentPage + 1) * itemsPerPage, totalItems);
        const nextData = allRecipes
          .filter(
            item =>
              item.category.toLowerCase() === selectedCategory.toLowerCase(),
          )
          .slice(startIndex, endIndex);
        setRecipes(nextData);
        setCurrentData(nextData);
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const newData = data.data.slice(0, itemsPerPage);
      setRecipes(newData);

      setAllRecipes(data.data);
      setFilteredRecipes(data.data);

      const counts = data.data.reduce((acc, item) => {
        const category = item.category.toLowerCase();
        acc[category] = (acc[category] || 0) + 1;
        return acc;
      }, {});
      setCategoryCounts(counts);
    }
  }, [isSuccess, data]);

  const handleSearchChange = text => {
    setSearchMenu(text);
    filterAndPaginateRecipes(text, 1);
  };

  const handleItemPress = id => {
    if (focusedItem === id) {
      setFocusedItem(null);
    } else {
      setFocusedItem(id);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => handleItemPress(item.id)}
      style={{
        backgroundColor: focusedItem === item.id ? '#00E092' : 'white',
      }}>
      <Items
        id={item.id}
        photo={item.photo}
        title={item.title}
        category={item.category}
        navigation={navigation}
        creator={item.creator}
        creator_photo={item.creator_photo}
      />
    </TouchableOpacity>
  );

  const handleCategoryChange = category => {
    setSelectedCategory(category);

    if (category === 'All') {
      setRecipes(filteredRecipes.slice(0, itemsPerPage));
      setCurrentPage(1);
    } else {
      const filteredData = filteredRecipes.filter(
        item => item.category.toLowerCase() === category.toLowerCase(),
      );

      setRecipes(filteredData.slice(0, itemsPerPage));
      setCurrentPage(1);
    }
  };

  const filterRecipes = (searchText, category) => {
    if (!searchText) {
      if (category === 'All') {
        setRecipes(data.data.slice(0, itemsPerPage));
      } else {
        const filteredData = data.data.filter(
          item => item.category.toLowerCase() === category.toLowerCase(),
        );
        setRecipes(filteredData.slice(0, itemsPerPage));
      }
    } else {
      const filteredData = data.data.filter(
        item =>
          item.title.toLowerCase().includes(searchText.toLowerCase()) &&
          (category === 'All' ||
            item.category.toLowerCase() === category.toLowerCase()),
      );

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      setRecipes(paginatedData);
    }
  };

  const countFilteredItems = () => {
    let filteredData = filteredRecipes;
    if (searchMenu) {
      filteredData = filteredData.filter(item =>
        item.title.toLowerCase().includes(searchMenu.toLowerCase()),
      );
    } else if (selectedCategory !== 'All') {
      filteredData = filteredData.filter(
        item => item.category.toLowerCase() === selectedCategory.toLowerCase(),
      );
    }
    return filteredData.length;
  };

  const totalItems = countFilteredItems();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  console.log(recipes);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <View style={{width: screenWidth}}>
        <SearchBar
          inputContainerStyle={{
            backgroundColor: '#EFEFEF',
            borderColor: 'EFEFEF',
            borderRadius: 10,
            color: 'black',
          }}
          containerStyle={{
            backgroundColor: '#EFEFEF',
            padding: 0,
            fontSize: 16,
            backgroundColor: '#F5F5F5',
            width: 330,
            marginTop: 20,
            borderRadius: 10,
            marginLeft: 30,
            color: 'black',
          }}
          placeholder="What are you cooking today?"
          value={searchMenu}
          onChangeText={handleSearchChange}
          lightTheme={true}
          showCancel={true}
        />
        <ScrollView
          style={styles.categories}
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'All' && styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryChange('All')}>
            <Text style={styles.categoryButtonText}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'Appetizers' &&
                styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryChange('Appetizers')}>
            <Text style={styles.categoryButtonText}>Appetizers</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'Main Course' &&
                styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryChange('Main Course')}>
            <Text style={styles.categoryButtonText}>Main Course</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.categoryButton,
              selectedCategory === 'Dessert' && styles.selectedCategoryButton,
            ]}
            onPress={() => handleCategoryChange('Dessert')}>
            <Text style={styles.categoryButtonText}>Dessert</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <ScrollView>
        <FlatList
          data={recipes}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={goToPreviousPage}
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.disabledPaginationButton,
            ]}
            disabled={currentPage === 1}>
            <Icon type="feather" name="chevron-left" size={30} color="white" />
          </TouchableOpacity>
          <Text>{`${Math.min(
            (currentPage - 1) * itemsPerPage + 1,
            totalItems,
          )}-${Math.min(
            currentPage * itemsPerPage,
            totalItems,
          )} of ${totalItems}`}</Text>
          <TouchableOpacity
            onPress={goToNextPage}
            style={[
              styles.paginationButton,
              currentPage * itemsPerPage >= totalItems &&
                styles.disabledPaginationButton,
            ]}
            disabled={currentPage * itemsPerPage >= totalItems}>
            <Icon type="feather" name="chevron-right" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchMenu;

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    // backgroundColor: 'blue',
    marginRight: 20,
  },

  paginationButton: {
    backgroundColor: '#EFC81A',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 15,
    padding: 5,
  },

  disabledPaginationButton: {
    backgroundColor: '#ccc',
  },

  categories: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 10,
  },

  categoryButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
  },

  selectedCategoryButton: {
    backgroundColor: '#00E092',
  },

  categoryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
