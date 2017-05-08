import { camelizeKeys } from 'humps'
import { normalize } from 'normalizr'

import { request } from './utils'
import { address } from './address'

export const get = (config, schema) => {
  return (
    request(config)
      .then(rsp => {
        console.log('Response: %o', rsp)
        // // let camelizedData = camelizeKeys(rsp)
        // let schemaData = normalize(rsp, schema)
        // console.log('schema data: %o', schemaData)

        return rsp
      })
  )
}

const base = (config) => {
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

export const getDetails = () => (
  get({ url: address.details })
)

// export const delMaterials = id => {
//   return del({
//     url: `${address.materials}${id}/`,
//     method: 'DELETE',
//     isJson: false
//   })
// }

// export const createMaterial = material => (
//   create({
//     url: address.materials,
//     method: 'POST',
//     body: JSON.stringify(material)
//   })
// )

// export const updateMaterial = material => (
//   update({
//     url: `${address.materials}${material.id}/`,
//     method: 'PATCH',
//     body: JSON.stringify(material)
//   })
// )

