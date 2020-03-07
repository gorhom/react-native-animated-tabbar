type AnimatedTabbarType = {
  getDeviceName(): Promise<string>;
};

const AnimatedTabbar = {
  getDeviceName: () => Promise.resolve('Phone'),
};

export default AnimatedTabbar as AnimatedTabbarType;
