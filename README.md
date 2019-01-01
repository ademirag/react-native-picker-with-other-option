
# react-native-picker-with-other-option

Sometimes, the item list in a picker is not sufficient. "Other" may be an option to fill this gap. And sometimes the other option may be wanted to be filled with some value. This native picker may have more than one 'other' option when one of them is selected a text input appears so the user can fill what is this 'other' option's value.

## Usage

### Install

npm install react-native-picker-with-other-option --save

### Import

```javascript
import PickerWithOther from 'react-native-picker-with-other-option'
```

You must also import Picker it self as you will declare items with Picker.Item

```javascript
import {Picker} from 'react-native';
```

### Example Markup
```javascript
<PickerWithOther
  inputProps={
   {
     style:{borderWidth:1, borderColor:"#000"}
   }
  }
  viewProps={
   {
     style:{height:60,width:"100%"}
   }
  }

  style={{height:20,width:"100%"}}

  onValueChange={(value)=>{console.log(value);}}>
	  <Picker.Item label="Option 1" value="1" />
	  <Picker.Item label="Option 2" value="2" />
	  <Picker.Item other label="Option 3" value="other" />
	  <Picker.Item other label="Option 4" value="other2" />
</PickerWithOther>
```

### Attributes

#### inputProps
This is the props passed to the text input. ***onChangeText prop will not work if you try to pass it, it's used internally by overwriting***

#### viewProps
The picker inside the component and the text input is contained by a View, to pass props to that View use viewProps

#### All other props are passed to inner Picker

#### Picker.Item other & value attributes
All items that have 'other' attribute will trig appearing text input. If an item is an 'other item', than its's value is used to distinguish which other option is filled with text input. Consider this:

#### onValueChange
value that comes from the component has the following structure as an examples:

```javascript
{ value: '1', otherItem: null } // Option 1
{ value: 'Hello', otherItem: 'other2' } // Option 4 + TextInput
```
value key, is the final value. It can be a value from Picker.Item which is **not** other or it's the text from input value.
otherItem is null if Picker.Item selected has no 'other' attribute, otherwise it is the value attribute given to Picker.Item with 'other' attribute.
