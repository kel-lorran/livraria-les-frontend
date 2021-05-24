export const searchAsObject = search => {
  return search.replace(/^\?/, '').split('&').reduce((ac, e) => {
    const [key, value] = e.split('=');
    return { ...ac, [key]: value }
  }, {})
}

export const abbreviateText = (text, len = 999) => (text || '').toString().replace(new RegExp(`(?<=.{${len}}).+`), '...');

export const logout = () => {
  window?.sessionStorage?.clear();
  window?.location?.reload();
}

export const phoneMask = (val = '') => {
  const str = val.toString().replace(/\D/g, '')
  let result = ''

  if (str.length < 11) {
    result = str.replace(/\B(?=\d{4}$)/g, '-')
      .replace(/\B(?=.{9}$)/g, ' ')
  } else {
    result = str.replace(/\d*(?=\d{11}$)/, '')
      .replace(/\B(?=\d{4}$)/g, '-')
      .replace(/(\B(?=.{9}$))|(\B(?=.{10}$))/g, ' ')
  }

  return result
}

export const cpfMask = (val = '') => {
  const str = val.toString().replace(/\D|(?<=.{14}).*/g,'')
  let result = ''

  result = str.replace(/(?<=^\d{3})\B|(?<=^\d{6})\B/g, '.')
    .replace(/(?<=^.{11})\B/g, '-')

  return result
}

export const cepMask = (val = '') => {
  const str = val.toString().replace(/\D|(?<=.{14}).*/g,'')
  let result = ''

  result = str.replace(/(?=.{3}$)/,'-')

  return result
}

export const dateMask = (val = '') => {
  const str = val.toString()
  let result = str.replace(/\D/g, '')
    .replace(/\d*(?=\d{8}$)/, '')
    .replace(/((?<=^\d{2})\B)|((?<=^\d{4})\B)/g, '/')

  return result
}

export const updateMerchandiseList = ({ bookId, quantity, order }) => {
  let hasInList = false;

  const merchandiseList = order.merchandiseList.map(m => {
    if (m.book.id == bookId) {
      hasInList = true;
      return {
        ...m,
        quantity: (m.quantity + quantity) > 0 ? m.quantity + quantity : 0
      }
    }
    return m;
  });

  return hasInList ? merchandiseList : [...merchandiseList, { quantity, book: { id: bookId } }];
}

const setError = target => {
  target.classList.add('error')
  target.pattern = "\\W{20,}"
}
const removeError = target => {
  target.classList.remove('error')
  target.pattern = ".+"
}

export const cpfValidation = (e) => {
  const val = e.target.value
  const str = val.toString().replace(/\D|(?<=.{14}).*/g,'')
  if(str.length < 11 || (new Set(Array.from(str))).size === 1) {
    setError(e.target)
    return false
  }

  const [ num1 ] = Array.from(str.replace(/(?<=.{9}).*/g, '')).reduce((a,e) => {
    a[0] = (a[0] + (+e * a[1]--))
    return a
  },[0, 10])
  if(((num1 * 10) % 11) % 10 !== +str[9]) {
    setError(e.target);
  }

  const [ num2 ] = Array.from(str.replace(/(?<=.{10}).*/g, '')).reduce((a,e) => {
    a[0] = (a[0] + (+e * a[1]--))
    return a
  },[0, 11])
  if(((num2 * 10) % 11) % 10 !== +str[10]) {
    setError(e.target);
    return false
  }
  removeError(e.target)
  return true
}

export const confirmPasswordValidation = (e) => {
  const val = e.target.value
  const masterVal = document.getElementById(e.target.dataset.inputmaster)?.value
  if (val === masterVal)
    removeError(e.target)
  else
    setError(e.target);
}

export const confirmTimeInterval = e => {
  const val = e.target.value
  const masterVal = document.getElementById(e.target.dataset.inputmaster)?.value
  if (val && masterVal && val <= masterVal)
    setError(e.target);
  else
    removeError(e.target)
}
