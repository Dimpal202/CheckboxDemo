import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';


const Todolist = () => {
  const [mainArray, setMainArray] = useState([]);
  const [nextArray, setNextArray] = useState([]);
  const [value, setValue] = useState('');


  const [newarray, setnewarray] = useState([])


  const [addindex, setaddindex] = useState(null)
  const [selectedItems, setSelectedItems] = useState([]);


  const onClickAdd = () => {
    // array.push("g")
    // setnewarray(array)
    // addarray.push(value){}
    let data = {
      "id": mainArray.length + 1,
      "value": value,
      "checked": false
    }


    if (addindex !== null) {
      mainArray[addindex] = data
    }
    else {
      setMainArray([...mainArray, data]);
    }
    console.log("item=========", addindex);
    setValue('')
    setaddindex(null)
  }



  const EditValue = (item, value) => {
    // const ArrayNew = [...addarray]
    // ArrayNew[index]= value
    // setaddarray(ArrayNew)
    setValue(value)
    setaddindex(item)
  }


  const onClickDelete = (item, value) => {
    // addarray.pop()
    // setaddarray(addarray)
    const ArrayNew = [...mainArray]
    ArrayNew.pop(item.id)
    setMainArray(ArrayNew)


    // const filteredItems = addarray.filter(item => item.id !== index);
    // setaddarray(filteredItems);


    // const filteredItems = mainArray.filter((item) => item.id !== id);
    // setMainArray(filteredItems);
    // setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };


  const handleCheckboxChange = (id) => {
    // const updatedMainArray = mainArray.map((item) =>
    //   item.id === id ? { ...item, checked: !item.checked } : item
    // );
    // setMainArray(updatedMainArray);


    // const selectedItem = updatedMainArray.find((item) => item.id === id);
    // if (selectedItem) {
    //   if (selectedItem.checked) {
    //     setSelectedItems([...selectedItems, selectedItem]);
    //   } else {
    //     setSelectedItems(selectedItems.filter((item) => item.id !== id));
    //   }
    // }
    const updatedMainArray = mainArray.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setMainArray(updatedMainArray);

    const selectedItem = updatedMainArray.find((item) => item.id === id);
    if (selectedItem) {
      if (selectedItem.checked) {
        setSelectedItems([...selectedItems, selectedItem]);
        // Move the checked item to the next array
        const updatedNextArray = nextArray.concat(selectedItem);
        setNextArray(updatedNextArray);
        // Remove the checked item from the main array
        const filteredMainArray = updatedMainArray.filter((item) => item.id !== id);
        setMainArray(filteredMainArray);
      } else {
        setSelectedItems(selectedItems.filter((item) => item.id !== id));
      }
    }
  };


  const moveSelectedItem = () => {
    const updatedMainArray = mainArray.filter((item) => !item.checked);
    const movedItems = mainArray.filter((item) => item.checked);
    setMainArray(updatedMainArray);
    setNextArray(nextArray.concat(movedItems));
    setSelectedItems([]);
  };


  const handleNextArrayCheckboxChange = (id) => {
    const updatedNextArray = nextArray.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setNextArray(updatedNextArray);


    const selectedItem = updatedNextArray.find((item) => item.id === id);
    if (selectedItem) {
      if (!selectedItem.checked) {
        setMainArray([...mainArray, selectedItem]);
        setNextArray(nextArray.filter((item) => item.id !== id));
      }
    }
  };


  return (
    <View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 50 }}>
        <Text style={{ fontSize: 30 }}>List add</Text>
      </View>
      <View style={{ flexDirection: 'row', marginHorizontal: 20, marginVertical: 20, alignItems: 'center' }}>
        <TextInput
          style={{ borderWidth: 1, flex: 1 }}
          onChangeText={(text) => setValue(text)}
          value={value}
          placeholder="Add value"
        />
        <TouchableOpacity onPress={onClickAdd}>
          <Text style={{ fontSize: 20 }}>Add</Text>
        </TouchableOpacity>
      </View>


      {mainArray.map((item, index) => (
        <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 50 }}>
          <CheckBox
            boxType="square"
            onAnimationType="fade"
            offAnimationType="fade"
            style={{ width: 20, height: 20, margin: 5 }}
            value={item.checked}
            onValueChange={() => handleCheckboxChange(item.id)}
          />
          <Text style={{ fontSize: 20 }}>{item.value}</Text>
          <TouchableOpacity onPress={() => EditValue(index, item.value)}>
            <Text style={{ fontSize: 20, color: "red" }}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onClickDelete(item.id, item.value)}>
            <Text style={{ fontSize: 20, color: 'red' }}>Delete</Text>
          </TouchableOpacity>
        </View>
      ))}


      <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 30 }}>
        <Text style={{ fontSize: 20, color: 'black' }}>Move Selected Item</Text>
      </View>


      {nextArray.map((item, index) => (
        <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 50 }}>
          <CheckBox
            boxType="square"
            onAnimationType="fade"
            offAnimationType="fade"
            style={{ width: 20, height: 20, margin: 5 }}
            value={item.checked}
            onValueChange={() => handleNextArrayCheckboxChange(item.id)}
          />
          <Text style={{ fontSize: 20 }}>{item.value}</Text>
          {/* <TouchableOpacity onPress={() => EditValue(index, item.value)}>
                <Text style={{ fontSize: 20, color: "red" }}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onClickDelete(item.id, item.value)}>
                <Text style={{ fontSize: 20, color: "red" }}>Delete</Text>
              </TouchableOpacity> */}
        </View>
      ))}
    </View>
  );
};


export default Todolist;