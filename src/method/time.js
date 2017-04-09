//时间小于10时，给十位填0
export const adjustTime = time => {
  if (time < 10) {
    return `0${time}`
  } else {
    return time
  }
}

//将时间戳转化为2017-04-05 09：11：01格式
export const transformTime = time => {
  let date = new Date(time * 1000)
  let year = date.getFullYear()
  let month = adjustTime(date.getMonth() + 1)
  let day = adjustTime(date.getDate())
  let hour = adjustTime(date.getHours())
  let minute = adjustTime(date.getMinutes())
  let second = adjustTime(date.getSeconds())
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

