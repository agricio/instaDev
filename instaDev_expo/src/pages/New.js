import React, { Component } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { View, StyleSheet, TouchableOpacity, Text, TextInput, Image } from 'react-native';

import api from '../services/api';


export default class New extends Component {
  static navigationOptions =  {
    headerTitle: () => <Text style={styles.headerTitle}>New Post</Text>
  };

  state = {
    preview: null,
    image: null,
    author: '',
    description: '',
    place: '',
    hashtags: '',
  };

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1, 
    });

    let prefix = new Date().getTime();
    let ext = 'jpg';

    let refact = {
      uri: result.uri,
      type: result.type,
      name: `${prefix}.${ext}`

    }

    if (!result.cancelled) {
      this.setState({ image: refact });
    }
  };
 
  handleSubmit = async () => {
    const data = new FormData();
      data.append('image', this.state.image);
      data.append('author', this.state.author);
      data.append('place', this.state.place);
      data.append('description', this.state.description);
      data.append('hashtags', this.state.hashtags);

      await api.post('posts', data);

      this.props.navigation.navigate('Feed');
  }

  render() {
    
    return <View style={styles.container}>
      <TouchableOpacity style={styles.selecButton} onPress={this._pickImage} >
        <Text style={styles.selecButtonText}>Select Image</Text>
      </TouchableOpacity>

      { this.state.image && <Image style={styles.preview} source={this.state.image} />}

      <TextInput
         style= {styles.input}
         autoCorrect={false}
         autoCapitalize="none"
         placeholder="Author Name"
         placeholderTextColor="#9999"
         value={this.state.author}
         onChangeText={author => this.setState({ author })}>
      </TextInput>

      <TextInput
         style= {styles.input}
         autoCorrect={false}
         autoCapitalize="none"
         placeholder="Description"
         placeholderTextColor="#9999"
         value={this.state.description}
         onChangeText={description => this.setState({ description })}>
      </TextInput>

      <TextInput
         style= {styles.input}
         autoCorrect={false}
         autoCapitalize="none"
         placeholder="Place"
         placeholderTextColor="#9999"
         value={this.state.place}
         onChangeText={place => this.setState({ place })}>
      </TextInput>

      <TextInput
         style= {styles.input}
         autoCorrect={false}
         autoCapitalize="none"
         placeholder="Hashtags"
         placeholderTextColor="#9999"
         value={this.state.hashtags}
         onChangeText={hashtags => this.setState({ hashtags })}>
      </TextInput>

      <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>

    </View>;

   
         
  }
}

const styles = StyleSheet.create({

container: {
  flex: 1,
  paddingHorizontal: 20,
  paddingTop: 30,
},

selecButton:{
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#CCC',
  borderStyle: 'dashed',
  height: 42,
  justifyContent: 'center',
  alignItems: 'center', 
},

selecButtonText: {
  fontSize: 16,
  color: '#666'
},

preview: {
  width: 100,
  height: 100,
  marginTop: 10,
  alignSelf: 'center',
  borderRadius: 4,
},

input: {
  borderRadius: 4,
  borderWidth: 1,
  borderColor: '#ddd',
  padding: 15,
  marginTop: 10,
  fontSize: 16,
},

shareButton: {
  backgroundColor: '#7159c1',
  borderRadius: 4,
  height: 42,
  marginTop: 15,
  justifyContent: 'center',
  alignItems: 'center'
},

shareButtonText: {
  fontWeight: 'bold',
  fontSize: 16,
  color: '#FFF',
},

headerTitle: {
  fontWeight: 'bold',
  fontSize: 16,
  marginHorizontal: 140,
},

});