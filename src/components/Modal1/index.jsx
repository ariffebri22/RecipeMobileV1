import React from 'react';
import {
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {Text} from '@rneui/themed';

const deviceHeight = Dimensions.get('window').height;

export class Modal1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
  }

  show = () => {
    this.setState({show: true});
  };

  close = () => {
    this.setState({show: false});
  };

  renderOutsideTouchable(onTouch) {
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  }

  renderTitle = () => {
    const {title} = this.props;
    return (
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            color: '#182E44',
            fontSize: 25,
            fontWeight: '700',
            marginTop: 15,
            marginBottom: 30,
          }}>
          {title}
        </Text>
      </View>
    );
  };

  renderContent = () => {
    const {message} = this.props;
    return (
      <View style={{alignItems: 'center'}}>
        <View style={{width: 220}}>
          <Text style={{fontSize: 18, textAlign: 'center', marginBottom: 30}}>
            {message}
          </Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <TouchableOpacity onPress={this.props.onPress}>
            <View
              style={{
                backgroundColor: '#EFC81A',
                width: 120,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 2,
                borderColor: '#EFC81A',
                marginRight: 10,
              }}>
              <Text style={{color: 'white', fontSize: 18}}>Yes</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.close}>
            <View
              style={{
                backgroundColor: 'white',
                width: 120,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                borderWidth: 3,
                borderColor: '#EFC81A',
                marginLeft: 10,
              }}>
              <Text style={{color: '#EFC81A', fontSize: 18}}>No</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    let {show} = this.state;
    const {onTouchOutside} = this.props;

    return (
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={show}
        onRequestClose={this.close}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#000000AA',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {this.renderOutsideTouchable(onTouchOutside)}
          <View
            style={{
              backgroundColor: '#FFFFFF',
              width: '80%',
              borderRadius: 10,
              paddingHorizontal: 10,
              maxHeight: deviceHeight * 0.35,
              marginBottom: 280,
              paddingBottom: 15,
            }}>
            {this.renderTitle()}
            {this.renderContent()}
          </View>
        </View>
      </Modal>
    );
  }
}
