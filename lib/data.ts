import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PageData } from '../components/section'
import { FooterData } from '../components/footer'

const dataDir = path.join(process.cwd(), 'data')

export type Pages = { [id: string]: PageData }
export type Data = Pages | FooterData

export const getData = (file: 'pages' | 'footer' = 'pages') => {
  const fullPath = path.join(dataDir, `${file}.yml`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  if (file === 'footer') {
    return matterResult.data as FooterData
  } else {
    return matterResult.data as Pages
  }
}
