import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const MemberKey = 'Admin-Member'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(data) {
  return Cookies.set(TokenKey, data)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getMember() {
  var data = Cookies.get(MemberKey)
  return data ? JSON.parse(data) : {}
}

export function setMember(data) {
  return Cookies.set(MemberKey, data)
}

export function removeMember() {
  return Cookies.remove(MemberKey)
}
