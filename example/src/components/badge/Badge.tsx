import React, { memo, useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface BadgeProps {
  iconSize: number;
}

const BADGE_SIZE = 10;

const BadgeComponent = ({ iconSize }: BadgeProps) => {
  const [count, setCount] = useState(1);
  const containerStyle = useMemo(
    () => ({
      ...styles.container,
      transform: [
        { translateX: (iconSize - BADGE_SIZE / 1.5) / 2 },
        { translateY: (iconSize - BADGE_SIZE / 1.5) / -2 },
      ],
    }),
    [iconSize]
  );

  useEffect(() => {
    const intervalId = setInterval(() => setCount(state => state + 1), 2500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <View style={containerStyle}>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

const Badge = memo(BadgeComponent);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    minWidth: BADGE_SIZE,
    minHeight: BADGE_SIZE,
    borderRadius: BADGE_SIZE,
    backgroundColor: 'red',
  },
  count: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 1,
    lineHeight: BADGE_SIZE,
    fontSize: 6,
  },
});

export default Badge;
