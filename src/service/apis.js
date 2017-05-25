import { request } from './utils'
import { address } from './address'

export const get = (config, schema) => {
  return (
    request(config)
      .then(rsp => {
        console.log('Response: %o', rsp)
        return rsp
      })
  )
}

const base = config => {
  return (
    request(config)
      .then(rsp => {
        return rsp
      })
  )
}

export const del = config => base(config)

export const create = config => base(config)

export const update = config => base(config)

//Message
export const getMessage = () => (
  get({ url: address.message })
)

export const createMessage = message => (
  create({
    url: `${address.message}`,
    method: 'POST',
    body: JSON.stringify(message),
  })
)

export const delMessage = messageID => (
  del({
    url: `${address.message}${messageID}`,
    method: 'DELETE',
    isJson: false,
  })
)

export const updateMessage = messageID => (
  update({
    url: `${address.message}${messageID}`,
    method: 'PATCH',
    isJson: false,
  })
)

//Detail
export const getDetail = () => (
  get({ url: address.detail })
)

export const createDetail = detail => (
  create({
    url: `${address.detail}`,
    method: 'POST',
    body: JSON.stringify(detail),
  })
)

export const updateDetail = detailID => (
  update({
    url: `${address.detail}${detailID}`,
    method: 'PATCH',
    isJson: false,
  })
)

//Student
export const getStudent = () => (
  get({ url: address.student })
)

//NameSearch
export const getNameSearch = name => (
  get({ url: `${address.student}?name=${name}` })
)

//SIDSearch
export const getSidSearch = studentID => (
  get({ url: `${address.student}?studentID=${studentID}` })
)