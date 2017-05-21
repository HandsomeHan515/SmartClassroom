import { navMenu } from './Definition'

const status = {
  online: '在线',
  offline: '离线',
}

const student = [
  { id: 1, studentID: 13110581095, name: 'han', duty: '班长', status: status.online, phone: 1873377130 },
  { id: 2, studentID: 13110581096, name: 'song', status: status.offline, phone: 1873377199 },
  { id: 3, studentID: 13110581095, name: 'zhang', status: status.online, phone: 1873377130 },
  { id: 4, studentID: 13110581096, name: 'wang', status: status.offline, phone: 1873377199 },
  { id: 5, studentID: 13110581095, name: 'zhao', status: status.online, phone: 1873377130 },
  { id: 6, studentID: 13110581095, name: 'liu', status: status.offline, phone: 1873377199 },
  { id: 7, studentID: 13110581095, name: 'sun', status: status.online, phone: 1873377130 },
  { id: 8, studentID: 13110581095, name: 'qu', status: status.offline, phone: 1873377199 },
  { id: 9, studentID: 13110581095, name: 'wu', duty: '团支书', status: status.online, phone: 1873377130 },
  { id: 10, studentID: 13110581095, name: 'zhou', status: status.offline, phone: 1873377199 },
  { id: 11, studentID: 13110581095, name: 'yuan', status: status.online, phone: 1873377130 },
  { id: 12, studentID: 13110581095, name: 'lu', status: status.offline, phone: 1873377199 },
  { id: 13, studentID: 13110581095, name: 'curry', status: status.online, phone: 1873377130 },
  { id: 14, studentID: 13110581095, name: 'zheng', duty: '体育委员', status: status.offline, phone: 1873377199 },
  { id: 15, studentID: 13110581095, name: 'deng', status: status.online, phone: 1873377130 },
  { id: 16, studentID: 13110581095, name: 'xi', status: status.offline, phone: 1873377199 },
]

export { navMenu, student } 