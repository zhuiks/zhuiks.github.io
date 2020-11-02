import { FooterData } from '../components/footer'
import { getData, Pages } from './data'

describe('Data Fetching', ()=> {
  it('gets pages data', ()=>{
    const data = getData() as Pages
    expect(data).toHaveProperty('intro')
    expect(data.intro).toHaveProperty('title')
    expect(data.intro.title).toEqual("Evgen Kucherov")
    expect(data).toHaveProperty('code')
  })
  it('gets footer data', ()=> {
    const data = getData('footer') as FooterData
    expect(data).toHaveProperty('header')
  })
})