export const adjustTime = time => {
  if (time < 10) {
    return `0${time}`
  } else {
    return time
  }
}

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

