// From: https://gist.github.com/BennoAlif/e07953f68261b3ff843a722053dfa335
export const toRupiah = (m: number, style = undefined) => {
  return new Intl.NumberFormat('id-ID', {
    style,
    currency: 'IDR',
  }).format(m)
}

export const rupiahToNumber = (m: string) => {
  return +m.replace(/([\.])/g, '')
}
