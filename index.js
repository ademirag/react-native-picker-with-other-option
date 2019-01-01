import React, {Component} from 'react';
import {TextInput, StyleSheet, View,Picker} from 'react-native';


export default class PickerWithOther extends Component {
  constructor(props){
    super(props);

    let generatedProps = {...this.props};

    let children = [...this.props.children];
    var otherValues = [];
    for(var i = 0; i < children.length; i++){
      if(children[i].props.other === true){
        otherValues.push(children[i].props.value);
      }
    }

    let onValueChangeFunc = (value) => {
      this.setState({pickerValue:value});
      var isOther = false;
      var v = value;
      var otherItem = null;
      if(this.state.otherValues.indexOf(value) !== -1){
        isOther = true;
        otherItem = value;
        v = "";
        this.setState({otherItem:otherItem});
      }
      if(this.props.onValueChange){
        this.props.onValueChange({value:v,otherItem:otherItem});
      }
    };

    this.state = {
      pickerValue:null,
      generatedProps:generatedProps,
      onValueChangeFunc:onValueChangeFunc,
      otherValues:otherValues,
      otherItem:null,
    }
  }
  static getDerivedStateFromProps(nextProps, prevState){
    let generatedProps = {...nextProps};

    return {
      generatedProps:generatedProps,
    }
  }


  render() {

    let textInput;

    let inputObjects = {...this.props.inputProps};
    if(inputObjects["onChangeText"]){
      delete inputObjects["onChangeText"]
    }

    if(this.state.otherValues.indexOf(this.state.pickerValue) !== -1 && this.state.pickerValue !== null){
      textInput = (
        <TextInput onChangeText={(value)=>{
          if(this.props.onValueChange){
            this.props.onValueChange({value:value,otherItem:this.state.otherItem});
          }
        }} {...inputObjects} />
      )
    }

    return (
      <View {...this.props.viewProps}>
        <Picker {...this.state.generatedProps} onValueChange={this.state.onValueChangeFunc}
          selectedValue={this.state.pickerValue}
          >
          {this.props.children}
        </Picker>
        {textInput}
      </View>
    );
  }
}
