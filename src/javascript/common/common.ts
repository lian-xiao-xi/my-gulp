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


/**
 * 对html字符转义
 */
export function htmlEncode(html: string): string {
    //1.首先动态创建一个容器标签元素，如DIV
    let temp = document.createElement ("div");
    //2.然后将要转换的字符串设置为这个元素的innerText(ie支持)或者textContent(火狐，google支持)
    (temp.textContent != undefined ) ? (temp.textContent = html) : (temp.innerText = html);
    //3.最后返回这个元素的innerHTML，即得到经过HTML编码转换的字符串了
    let output = temp.innerHTML;
    temp = null;
    return output;
  }
  
  /**
   * 对html字符反转义
   */
  export function htmlDecode(text:string): string {
    //1.首先动态创建一个容器标签元素，如DIV
    let temp = document.createElement("div");
    //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
    temp.innerHTML = text;
    //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
    let output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  }
  
