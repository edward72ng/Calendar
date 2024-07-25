class GlobalState {
  constructor() {
    if (!GlobalState.instance) {
      this.value = null;
      GlobalState.instance = this;
    }         

    return GlobalState.instance;
  }

  getValue() {
    return this.value;
  }

  setValue(data) {
    this.value = data
  }
}

const instance = new GlobalState();

export default instance;
