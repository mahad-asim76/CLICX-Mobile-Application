import React  from 'react';
import { ScrollView, View, Text, TouchableOpacity} from 'react-native';
import styles from '../../../../Themes/Default Theme/Reporting/Pulse/DropDownFilterStyles.js';

const DropdownModal = ({ isVisible, options, onClose, onSelect, selectedOption, setSelectedOption}) => {

    const selectOption = (option) => {
      setSelectedOption(option);
      onSelect(option);
      onClose();
    };
    
    const customSort = (a, b) => {
      if (a === "OVERALL") {
        return -1; 
      } else if (b === "OVERALL") {
        return 1; 
      } else {
        return a.localeCompare(b);
      }
    };

    options.sort(customSort);

    return (
      <View>
        {isVisible && (
          <ScrollView style={styles.modalContainer}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                onPress={() => selectOption(option)}
                disabled={selectedOption === option}
                style={[
                  styles.option,
                  selectedOption === option && styles.selectedOption,
                ]}
              >
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
    </View>
    );
  };

  export default DropdownModal;