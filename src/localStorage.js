export const loadState = () => {
  try {
    const serializedPPState = localStorage.getItem('encrypted_pp');
    const serializedADDRState = localStorage.getItem('address');

    if (serializedPPState || serializedADDRState === null) {
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
