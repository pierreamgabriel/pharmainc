
import React, { useEffect, useState } from 'react';
import { Header as HeaderRNE, ListItem, Avatar, SearchBar, Overlay } from 'react-native-elements';
import { SafeAreaView, ScrollView, Text, View, StyleSheet, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSync, faFilter, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Picker } from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import SplashScreen from 'react-native-splash-screen';


function App() {
  SplashScreen.hide();
  const [results, setResults] = useState();
  const [cloneResults, setCloneResults] = useState();
  const [settings, setSettings] = useState({
    page: 1,
    search: "",
    gender: "",
    country: "",
    checked: 0,
    checkAll: true,
    checkMale: false,
    checkFemale: false
  });
  const URL = `https://randomuser.me/api/?inc=gender,name,nat,picture,email,dob,cell,location,id&page=${settings.page}&results=50`;
  const [visible, setVisible] = useState({
    picker: false,
    loading: false
  });
  const [modal, setModal] = useState({
    visible: false,
    name: "",
    image: "",
    email: "",
    gender: "",
    dob: "",
    phone: "",
    nat: "",
    street: "",
    city: "",
    country: "",
    id: ""
  });

  const search = (arg1) => {
    const name = arg1.split(/(\s+)/);

    if (name[2] != "" && name[2] != null) {
      name[2] = name[2][0].toUpperCase() + name[2].slice(1);
    }

    if (arg1 != "filter") {
      setSettings({ ...settings, search: arg1 });
    }

    if (arg1 == "" || arg1 == "filter") {
      if (settings.country != "" && settings.country != "all") {
        const newList = cloneResults.filter(prop => prop.nat == settings.country);
        setResults(newList);
        filterGender(newList);
      } else if (settings.country == "all" || settings.country == "" || arg1 == "") {
        setResults(cloneResults);
        filterGender(cloneResults);
      }

      function filterGender(arg) {

        if (settings.gender == "male" || settings.gender == "female") {
          const filterGender = arg.filter(prop => prop.gender == settings.gender);
          setResults(filterGender);
        } else if (settings.gender == "all") {
          setResults(arg);
        }
      }
    } else {
      const newList = cloneResults.filter(prop => prop.name.first.includes(name[0]) || prop.name.last.includes(name[2]));
      setResults(newList);
      if (settings.country != "" && settings.country != "all") {
        const filterList = newList.filter(prop => prop.nat == settings.country);
        setResults(filterList);
      } else if (settings.country == "all") {
        setResults(newList);
      }
    }

  }

  const loadMore = () => {
    setSettings({ ...settings, page: settings.page + 1 });
    axios.get(URL)
      .then(function (response) {
        setResults([...results, ...response.data.results]);
        setCloneResults([...cloneResults, ...response.data.results]);
        setVisible({...visible, loading: false});
      });
  }

  const openModal = (args) => {
    if (args == "close") {
      setModal({ ...modal, visible: false });
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
      id: args.id
    });
  }

  useEffect(() => {

    if (settings.country != "" || settings.checked != 0) {
      search("filter");
      return;
    }
    axios.get(URL)
      .then(function (response) {
        setResults(response.data.results);
        setCloneResults(response.data.results);
      });
  }, [settings.country, settings.checked]);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <SafeAreaView>
        <HeaderRNE
          containerStyle={styles.header}
          statusBarProps={{ backgroundColor: '#0083CA', }}
          leftComponent={{ text: 'Pharma Inc.', style: styles.leftHeader }} >
        </HeaderRNE>
      </SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <Text style={styles.homeTitle}>Patients</Text>
      </TouchableWithoutFeedback>
      <View style={styles.searchView}>
        <SearchBar
          onSubmitEditing={Keyboard.dismiss}
          onChangeText={(value) => search(value)}
          value={settings.search}
          containerStyle={{
            backgroundColor: 'white',
            borderBottomColor: 'transparent',
            borderTopColor: 'transparent',
            width: '80%'
          }}
          inputContainerStyle={{ backgroundColor: 'white', }}
          inputStyle={{
            borderColor: '#ccc', borderWidth: 2, borderRadius: 8,
            paddingLeft: 8
          }}
          searchIcon={false}
          clearIcon={false}
          placeholder="Search..."
        />
        <FontAwesomeIcon icon={faFilter} size={30} style={{ marginTop: 20 }} onPress={() =>
          setVisible({ ...visible, picker: !visible.picker })} />
      </View>

      {visible.picker &&
        <View>
          <Text style={{ marginLeft: 12, fontSize: 18 }}>Choose a nationality</Text>
          <Picker
            selectedValue={settings.country}
            onValueChange={(value) =>
              setSettings({ ...settings, country: value })
            }
            style={{ marginBottom: 10 }}
          >
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
      }
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
        <CheckBox value={settings.checkAll}
          onValueChange={() => {
            setSettings({
              ...settings, checkAll: true, checkMale: false, checkFemale: false,
              checked: settings.checked + 1, gender: "all"
            })
          }} />
        <Text>All</Text>
        <CheckBox value={settings.checkMale}
          onValueChange={() => {
            setSettings({
              ...settings, checkAll: false, checkMale: true, checkFemale: false,
              checked: settings.checked + 1, gender: "male"
            })
          }} />
        <Text>Male</Text>
        <CheckBox value={settings.checkFemale}
          onValueChange={() => {
            setSettings({
              ...settings, checkAll: false, checkMale: false, checkFemale: true,
              checked: settings.checked + 1, gender: "female"
            })
          }} />
        <Text>Female</Text>
      </View>
      <ScrollView
        onScroll={(e) => {
          let paddingToBottom = 10;
          paddingToBottom += e.nativeEvent.layoutMeasurement.height;
          if (e.nativeEvent.contentOffset.y >= e.nativeEvent.contentSize.height - paddingToBottom) {
            loadMore();
            setVisible({ ...visible, loading: true });
          }
        }}
      >
        {
          results &&
          results.map((user, index) => {
            return (
              <ListItem key={index} containerStyle={styles.listItems} bottomDivider
                underlayColor="#00AFAD"
                onPress={() => openModal({
                  name: `${user.name.title} ${user.name.first} ${user.name.last}`,
                  image: user.picture.medium,
                  email: user.email,
                  gender: user.gender,
                  dob: moment(user.dob.date, 'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY'),
                  phone: user.cell,
                  nat: user.nat,
                  street: `${user.location.street.number} ${user.location.street.name}`,
                  city: `${user.location.city} ${user.location.postcode}`,
                  country: user.location.country,
                  id: `${user.id.name} ${user.id.value}`

                })}>
                <Avatar source={{ uri: user.picture.thumbnail }} rounded={true} size="medium" />
                <ListItem.Content>
                  <ListItem.Title>{user.name.title} {user.name.first} {user.name.last}</ListItem.Title>
                  <ListItem.Subtitle>{user.gender[0].toUpperCase() + user.gender.slice(1)}</ListItem.Subtitle>
                  <ListItem.Subtitle>{moment(user.dob.date, 'YYYY-MM-DD hh:mm:ss').format('DD/MM/YYYY')}</ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            );
          })
        }

        <Overlay isVisible={modal.visible} overlayStyle={{ width: '95%', height: '70%' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 50, marginTop: -60 }}
              source={{
                uri: modal.image,
              }}
            />
          </View>

          <FontAwesomeIcon icon={faXmark} size={30} style={{ position: 'absolute', top: 15, right: 20 }}
            onPress={() => openModal("close")} />

          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black', textAlign: 'center' }}>{modal.name}</Text>
          <Text style={{ fontSize: 15, color: 'black', textAlign: 'center' }}>{modal.email}</Text>
          <Text style={{ fontSize: 15, color: 'black', textAlign: 'center', marginBottom: 15 }}>{modal.id}</Text>
          <Text style={{ fontSize: 15, color: 'black', marginLeft: 20 }}>Gender: {modal.gender}</Text>
          <Text style={{ fontSize: 15, color: 'black', marginLeft: 20 }}>Birthday: {modal.dob}</Text>
          <Text style={{ fontSize: 15, color: 'black', marginLeft: 20 }}>Nationality: {modal.nat}</Text>
          <Text style={{ fontSize: 15, color: 'black', marginLeft: 20 }}>Phone: {modal.phone}</Text>
          <Text style={{ fontSize: 15, color: 'black', marginLeft: 20, marginTop: 10 }}>Address:</Text>
          <Text style={{ fontSize: 15, color: 'black', marginLeft: 20 }}>{modal.street}</Text>
          <Text style={{ fontSize: 15, color: 'black', marginLeft: 20 }}>{modal.city}</Text>
          <Text style={{ fontSize: 15, color: 'black', marginLeft: 20 }}>{modal.country}</Text>

        </Overlay>

        {visible.loading &&
          <View style={styles.loadingView}><FontAwesomeIcon icon={faSync} size={25} style={{ marginTop: 5 }} />
            <Text
              style={styles.loadingText}>Loading more...</Text>
          </View>
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0083CA',
  },
  leftHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    width: 185,
    marginTop: 5
  },
  homeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 25,
    color: 'black'
  },
  searchView: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20
  },
  listItems: {
    borderWidth: 2,
    borderBottomWidth: 2,
    marginBottom: 5,
    width: '98%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  loadingView: {
    flexDirection: 'row',
    paddingTop: 25,
    paddingBottom: 25,
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  loadingText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10

  }
});

export default App;
