// export function getHrefVal(key: string):string {
//   let WinHrefSearch: string = window.location.search;
//   if(WinHrefSearch.trim().length === 0) {
//     return ''
//   } else {
//     WinHrefSearch = WinHrefSearch.replace(/&amp;/g, '&').substr(1);
//     let arr: string[] = WinHrefSearch.split('&');
//     let searchKeyVal = {};
//     let newArr: string[];
//     arr.forEach((item: string) => {
//       newArr = item.split('=');
//       if(newArr[0] === key) {
//         return newArr[1]
//       }
//     })
//   }
// }

/**
 * 获取url中的参数的值
 */
// @param url 为一个可选参数
export function getHrefVal(name: string, url?: string) :string {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let regMatch = window.location.search.substr(1).match(reg);
    if (url) {
        let _url = url.split("?")[1];
        regMatch = _url.match(reg);
    }
    if (regMatch) return '';
    else return decodeURIComponent(regMatch[2]);
}

export function bodyAppend(text:string) {
  let pEle = document.createElement('p')
  pEle.innerText = text
  pEle.classList.add('add-ele')
  document.querySelector('body').appendChild(pEle)
}

