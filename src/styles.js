import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  header: {
    backgroundColor: '#0083CA',
  },
  leftHeader: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    width: 185,
    marginTop: 5,
  },
  homeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 25,
    color: 'black',
  },
  searchView: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
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
    marginRight: 'auto',
  },
  loadingText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10,
  },
  searchBarContainer: {
    backgroundColor: 'white',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    width: '80%',
  },
  searchInputContainer: {
    backgroundColor: 'white',
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 8,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  filterIcon: {
    marginTop: 20,
  },
  nationalityTitle: {
    marginLeft: 12,
    fontSize: 18,
  },
  picker: {
    marginBottom: 10,
  },
  genderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: -60,
  },
  overlay: {
    width: '95%',
    height: '70%',
  },
  closeIcon: {
    position: 'absolute',
    top: 15,
    right: 20,
  },
  modalName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  modalId: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalInfo: {
    fontSize: 15,
    color: 'black',
    marginLeft: 20,
  },
  modalEmail: {
    fontSize: 15,
    color: 'black',
    textAlign: 'center',
  },
  modalAddress: {
    fontSize: 15,
    color: 'black',
    marginLeft: 20,
    marginTop: 10,
  },
  loadingIcon: {
    marginTop: 5,
  },
});
