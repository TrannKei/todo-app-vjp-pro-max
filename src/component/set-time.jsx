export const SetDate=()=> {
    let newDate = new Date()
let date = newDate.getDate();
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

return `${date}/${month<10?`0${month}`:`${month}`}/${year}`
}
export const SetTime = () => {
    let time = new Date();
    let hours = (time.getHours() < 10 ? '0' : '') + time.getHours();
    let minutes = (time.getMinutes() < 10 ? '0' : '') + time.getMinutes();
    // let seconds = (time.getSeconds() < 10 ? '0' : '') + time.getSeconds();
    return `${hours}:${minutes}`
  }
