import {View, Text} from 'react-native';
import React from 'react';

// Component representing the visual choice (Like or Nope) displayed on Tinder cards.

const TinderChoice = ({type}) => {
  return (
    <View>
      {/* Text element representing the visual choice */}
      <Text
        style={{
          // Set color based on the type of choice (Like or Nope)
          color: type === 'Like' ? '#01FF84' : '#F6006B',
          fontSize: 40,
          // Add border and borderColor for visual appeal
          borderWidth: 4,
          borderColor: type === 'Like' ? '#01FF84' : '#F6006B',
          // Add padding to the text for better visual presentation
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        {/* Display the type of choice (Like or Nope) */}
        {type}
      </Text>
    </View>
  );
};

// Export the TinderChoice component as the default export of this module
export default TinderChoice;
