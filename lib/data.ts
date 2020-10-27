import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const fullPath = path.join(process.cwd(), 'data', 'data.yml')

interface DataProps {
  title?: string
  tag: string
  details?: string
  quote?: string
  colors?: {
    title?: string
    tag?: string
    details?: string
  }
}

export type Data = DataProps[]
export const getData = () => {
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  return matterResult.data as DataProps[]
}
