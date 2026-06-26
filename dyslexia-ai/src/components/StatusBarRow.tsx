'use client';

import { View, Text } from '../rn/primitives';
import { colors, fonts } from '../theme';

/** iOS-style faux status bar — ported from the Expo StatusBarRow. */
export default function StatusBarRow() {
  return (
    <View style={styles.row}>
      <Text style={styles.time}>9:41</Text>
      <View style={styles.right}>
        {/* Signal bars */}
        <View style={styles.signal}>
          {[5, 7, 9, 11].map((h, i) => (
            <View key={i} style={[styles.bar, { height: h }]} />
          ))}
        </View>
        {/* Battery */}
        <View style={styles.battery}>
          <View style={styles.batteryFill} />
          <View style={styles.batteryTip} />
        </View>
      </View>
    </View>
  );
}

const styles = {
  row: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 24,
    paddingRight: 24,
    flexShrink: 0,
  },
  time: {
    fontFamily: fonts.fredoka.semibold,
    fontSize: 14,
    color: colors.warm.text,
  },
  right: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  signal: { flexDirection: 'row', alignItems: 'flex-end', gap: 2, height: 12 },
  bar: { width: 2, backgroundColor: colors.warm.dark, borderRadius: 1 },
  battery: {
    width: 24,
    height: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.warm.dark,
    borderRadius: 2,
    justifyContent: 'center',
    paddingLeft: 2,
    paddingRight: 2,
  },
  batteryFill: {
    height: 6,
    width: 12,
    backgroundColor: colors.warm.dark,
    borderRadius: 1,
  },
  batteryTip: {
    position: 'absolute',
    right: -3,
    width: 2,
    height: 6,
    backgroundColor: colors.warm.dark,
    borderTopRightRadius: 1,
    borderBottomRightRadius: 1,
  },
} as const;
