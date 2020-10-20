import { getData } from './data'

describe('Data Fetching', ()=> {
  it('processes data', ()=>{
    const data = getData()
    expect(data).toHaveProperty('intro')
    expect(data.intro).toHaveProperty('title')
    expect(data.intro.title).toEqual("Evgen Kucherov")
    expect(data).toHaveProperty('code')
  })
})