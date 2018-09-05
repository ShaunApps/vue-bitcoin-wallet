export const loadState = () => {
  try {
    const serializedPPState = window.localStorage.getItem('bip39phrase');
    // const serializedADDRState = localStorage.getItem('address');

    if (serializedPPState === null) {
      return undefined;
    }
    return JSON.parse(serializedPPState);
  } catch (err) {
    return undefined;
  }
}


export const saveState = (state) => {
  try {
    localStorage.setItem('encrypted_pp', state.pp);
    localStorage.setItem('address', state.address);
  } catch (err) {
    console.log(err);
  }
}
