export function getHrefVal(key: string):string {
  let WinHrefSearch: string = window.location.search;
  if(WinHrefSearch.trim().length === 0) {
    return ''
  } else {
    WinHrefSearch = WinHrefSearch.replace(/&amp;/g, '&').substr(1);
    let arr: string[] = WinHrefSearch.split('&');
    let searchKeyVal = {};
    let newArr: string[];
    arr.forEach((item: string) => {
      newArr = item.split('=');
      if(newArr[0] === key) {
        return newArr[1]
      }
    })
  }
}
export function exam(str:string) {
  console.log('common.ts - fun -exam --> ', str)
}

export function bodyAppend(text:string) {
  let pEle = document.createElement('p')
  pEle.innerText = text
  pEle.classList.add('add-ele')
  document.querySelector('body').appendChild(pEle)
}
