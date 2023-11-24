import {View, Text, Image, Dimensions, Animated} from 'react-native';
import React, {useCallback, useRef} from 'react';
// import LinearGradient from 'react-native-linear-gradient';
import TinderChoice from './TinderChoice';
const {height, width} = Dimensions.get('window');
const TinderCard = ({item, isFirst, swipe, ...rest}) => {
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['-8deg', '0deg', '8deg'],
  });
  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const tinderSelection = useCallback(() => {
    return (
      <>
        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            right: 20,
            opacity: nopeOpacity,
            transform: [{rotate: '30deg'}],
          }}>
          <TinderChoice type={'Nope'} />
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            top: 60,
            left: 20,
            opacity: likeOpacity,
            transform: [{rotate: '-30deg'}],
          }}>
          <TinderChoice type={'Like'} />
        </Animated.View>
      </>
    );
  }, []);
  return (
    <Animated.View
      style={[
        {
          width: width - 20,
          height: height - 150,
          alignSelf: 'center',
          position: 'absolute',
          top: 40,
          borderRadius: 10,
        },
        isFirst && {
          transform: [...swipe.getTranslateTransform(), {rotate: rotate}],
        },
      ]}
      {...rest}>
      <Image
        source={item.image}
        style={{width: '100%', height: '100%', borderRadius: 10}}
      />

      <View>
        <Text
          style={{
            position: 'absolute',
            bottom: 35,
            left: 20,
            color: '#fff',
            fontSize: 40,
            fontWeight: 'bold',
          }}>
          {item.title}{' '}
          <Text style={{color: 'aqua', fontSize: 30, fontWeight: '400'}}>
            {item.age}
          </Text>
        </Text>

        <Text
          style={{
            position: 'absolute',
            bottom: 3,
            left: 22,
            color: 'pink',
            fontSize: 30,
          }}>
          {item.location}
        </Text>
      </View>

      {isFirst && tinderSelection()}
    </Animated.View>
  );
};

export default TinderCard;
