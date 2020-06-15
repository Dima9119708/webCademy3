export async function fetchDATA(url, fileName) {

  try {
    const getDATA = await fetch(url)
    const DATA_JSON = await getDATA.json()
    return DATA_JSON

  } catch (e) {
    alert('Проблемы с сервером')
    throw new Error(`
      Не получили данные по адресу ${url},
      Оправка была с файла ${fileName}`)
  }

}
