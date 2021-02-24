export default class {
    constructor(params) {
        this.params = params;
    }

    setTitle(title) {
        document.title = title;
    }

    options(opt, cellIndex){
      let res = '';
      for (let i = 0; i < opt.length; i++){
        res += `<option value=${opt[i]} data-cell="${cellIndex + i}">${opt[i]}</option>`
      }
      return res;
    }

    async getHtml() {
        return '';
    }
}