import React, {useEffect, useState} from 'react';
import {
  Header as HeaderRNE,
  ListItem,
  Avatar,
  SearchBar,
  Overlay,
} from 'react-native-elements';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import axios from 'axios';
import moment from 'moment';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faSync, faFilter, faXmark} from '@fortawesome/free-solid-svg-icons';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import SplashScreen from 'react-native-splash-screen';
import {styles} from './styles';

function Home() {
  SplashScreen.hide();
  const [results, setResults] = useState();
  const [cloneResults, setCloneResults] = useState();
  const [settings, setSettings] = useState({
    page: 1,
    search: '',
    gender: '',
    country: '',
    checked: 0,
    checkAll: true,
    checkMale: false,
    checkFemale: false,
  });
  const URL = `https://randomuser.me/api/?inc=gender,name,nat,picture,email,dob,cell,location,id&page=${settings.page}&results=50`;
  const [visible, setVisible] = useState({
    picker: false,
    loading: false,
  });
  const [modal, setModal] = useState({
    visible: false,
    name: '',
    image: '',
    email: '',
    gender: '',
    dob: '',
    phone: '',
    nat: '',
    street: '',
    city: '',
    country: '',
    id: '',
  });

  const search = arg1 => {
    const name = settings.search.split(/(\s+)/);

    if (name[2] !== '' && name[2] != null) {
      name[2] = name[2][0].toUpperCase() + name[2].slice(1);
    }

    if (settings.country !== '' && settings.country !== 'all') {
      const newList = cloneResults
        ? cloneResults.filter(prop => prop.nat === settings.country)
        : [];
      filterGender(newList, name);
    } else if (
      settings.country === 'all' ||
      settings.country === '' ||
      arg1 === ''
    ) {
      filterGender(cloneResults, name);
    }
  };

  const filterGender = (arg, name) => {
    if (settings.gender === 'male' || settings.gender === 'female') {
      const filterByGender = arg.filter(
        prop => prop.gender === settings.gender,
      );
      if (name && name.length > 0) {
        setResults(
          filterByGender.filter(
            prop =>
              prop.name.first.includes(name[0]) ||
              prop.name.last.includes(name[2]),
          ),
        );
      } else {
        setResults(filterByGender);
      }
    } else if (settings.gender === '' || settings.gender === 'all') {
      if (name && name.length > 0) {
        setResults(
          arg.filter(
            prop =>
              prop.name.first.includes(name[0]) ||
              prop.name.last.includes(name[2]),
          ),
        );
      } else {
        setResults(arg);
      }
    }
  };

  const loadMore = () => {
    setSettings({...settings, page: settings.page + 1});
    axios.get(URL).then(function (response) {
      setResults([...results, ...response.data.results]);
      setCloneResults([...cloneResults, ...response.data.results]);
      setVisible({...visible, loading: false});
    });
  };

  const openModal = args => {
    if (args === 'close') {
      setModal({...modal, visible: false});
      return;
    }
    setModal({
      visible: true,
      name: args.name,
      image: args.image,
      email: args.email,
      gender: args.gender,
      dob: args.dob,
      phone: args.phone,
      nat: args.nat,
      street: args.street,
      city: args.city,
      country: args.country,
      id: args.id,
    });
  };

  useEffect(() => {
    if (settings.country !== '' || settings.checked !== 0) {
      search('filter');
      return;
    }
    axios.get(URL).then(function (response) {
      setResults(response.data.results);
      setCloneResults(response.data.results);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.country, settings.checked]);

  useEffect(() => {
    if (cloneResults) {
      search(settings.search);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.search]);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView>
        <HeaderRNE
          containerStyle={styles.header}
          statusBarProps={{backgroundColor: '#0083CA'}}
          leftComponent={{
            text: 'Pharma Inc.',
            style: styles.leftHeader,
          }}
        />
      </SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Text style={styles.homeTitle}>Patients</Text>
      </TouchableWithoutFeedback>
      <View style={styles.searchView}>
        <SearchBar
          onSubmitEditing={Keyboard.dismiss}
          onChangeText={value => {
            setSettings({...settings, search: value});
          }}
          value={settings.search}
          containerStyle={styles.searchBarContainer}
          inputContainerStyle={styles.searchInputContainer}
          inputStyle={styles.searchInput}
          searchIcon={false}
          clearIcon={false}
          placeholder="Search..."
        />
        <FontAwesomeIcon
          icon={faFilter}
          size={30}
          style={styles.filterIcon}
          onPress={() => setVisible({...visible, picker: !visible.picker})}
        />
      </View>

      {visible.picker && (
        <View>
          <Text style={styles.nationalityTitle}>Choose a nationality</Text>
          <Picker
            selectedValue={settings.country}
            onValueChange={value => setSettings({...settings, country: value})}
            style={styles.picker}>
            <Picker.Item label="All countries" value="all" />
            <Picker.Item label="Australia" value="AU" />
            <Picker.Item label="Brazil" value="BR" />
            <Picker.Item label="Canada" value="CA" />
            <Picker.Item label="Switzerland" value="CH" />
            <Picker.Item label="Germany" value="DE" />
            <Picker.Item label="Denmark" value="DK" />
            <Picker.Item label="Spain" value="ES" />
            <Picker.Item label="Finland" value="FI" />
            <Picker.Item label="France" value="FR" />
            <Picker.Item label="United Kingdom" value="GB" />
            <Picker.Item label="Ireland" value="IE" />
            <Picker.Item label="Iran" value="IR" />
            <Picker.Item label="Norway" value="NO" />
            <Picker.Item label="Netherlands" value="NL" />
            <Picker.Item label="New Zealand" value="NZ" />
            <Picker.Item label="Turkey" value="TR" />
            <Picker.Item label="United States" value="US" />
          </Picker>
        </View>
      )}
      <View style={styles.genderContainer}>
        <CheckBox
          value={settings.checkAll}
          onValueChange={() => {
            setSettings({
              ...settings,
              checkAll: true,
              checkMale: false,
              checkFemale: false,
              checked: settings.checked + 1,
              gender: 'all',
            });
          }}
        />
        <Text>All</Text>
        <CheckBox
          value={settings.checkMale}
          onValueChange={() => {
            setSettings({
              ...settings,
              checkAll: false,
              checkMale: true,
              checkFemale: false,
              checked: settings.checked + 1,
              gender: 'male',
            });
          }}
        />
        <Text>Male</Text>
        <CheckBox
          value={settings.checkFemale}
          onValueChange={() => {
            setSettings({
              ...settings,
              checkAll: false,
              checkMale: false,
              checkFemale: true,
              checked: settings.checked + 1,
              gender: 'female',
            });
          }}
        />
        <Text>Female</Text>
      </View>
      <ScrollView
        onScroll={e => {
          let paddingToBottom = 10;
          paddingToBottom += e.nativeEvent.layoutMeasurement.height;
          if (
            e.nativeEvent.contentOffset.y >=
            e.nativeEvent.contentSize.height - paddingToBottom
          ) {
            loadMore();
            setVisible({...visible, loading: true});
          }
        }}>
        {results &&
          results.map(user => {
            return (
              <ListItem
                key={user.email + user.id.value}
                containerStyle={styles.listItems}
                bottomDivider
                underlayColor="#00AFAD"
                onPress={() =>
                  openModal({
                    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
                    image: user.picture.medium,
                    email: user.email,
                    gender: user.gender,
                    dob: moment(user.dob.date, 'YYYY-MM-DD hh:mm:ss').format(
                      'DD/MM/YYYY',
                    ),
                    phone: user.cell,
                    nat: user.nat,
                    street: `${user.location.street.number} ${user.location.street.name}`,
                    city: `${user.location.city} ${user.location.postcode}`,
                    country: user.location.country,
                    id: `${user.id.name} ${user.id.value}`,
                  })
                }>
                <Avatar
                  source={{uri: user.picture.thumbnail}}
                  rounded={true}
                  size="medium"
                />
                <ListItem.Content>
                  <ListItem.Title>
                    {user.name.title} {user.name.first} {user.name.last}
                  </ListItem.Title>
                  <ListItem.Subtitle>
                    {user.gender[0].toUpperCase() + user.gender.slice(1)}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    {moment(user.dob.date, 'YYYY-MM-DD hh:mm:ss').format(
                      'DD/MM/YYYY',
                    )}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })}

        <Overlay isVisible={modal.visible} overlayStyle={styles.overlay}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={{
                uri: modal.image,
              }}
            />
          </View>

          <FontAwesomeIcon
            icon={faXmark}
            size={30}
            style={styles.closeIcon}
            onPress={() => openModal('close')}
          />

          <Text style={styles.modalName}>{modal.name}</Text>
          <Text style={styles.modalEmail}>{modal.email}</Text>
          <Text style={styles.modalId}>{modal.id}</Text>
          <Text style={styles.modalInfo}>Gender: {modal.gender}</Text>
          <Text style={styles.modalInfo}>Birthday: {modal.dob}</Text>
          <Text style={styles.modalInfo}>Nationality: {modal.nat}</Text>
          <Text style={styles.modalInfo}>Phone: {modal.phone}</Text>
          <Text style={styles.modalAddress}>Address:</Text>
          <Text style={styles.modalInfo}>{modal.street}</Text>
          <Text style={styles.modalInfo}>{modal.city}</Text>
          <Text style={styles.modalInfo}>{modal.country}</Text>
        </Overlay>

        {visible.loading && (
          <View style={styles.loadingView}>
            <FontAwesomeIcon
              icon={faSync}
              size={25}
              style={styles.loadingIcon}
            />
            <Text style={styles.loadingText}>Loading more...</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default Home;
