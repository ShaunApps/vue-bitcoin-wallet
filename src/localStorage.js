export const loadState = () => {
  try {
    const serializedPPState = localStorage.getItem('bip39phrase');
    // const serializedADDRState = localStorage.getItem('address');

    if (serializedPPState === null) {
      return undefined;
    }
    return JSON.parse(serializedPPState);
  } catch (err) {
    return undefined;
  }
}


export const saveState = (state, key, item) => {
  try {
    localStorage.setItem(key, item);
    // localStorage.setItem('address', state.address);
  } catch (err) {
    console.log(err);
  }
}
