import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const fullPath = path.join(process.cwd(), 'data', 'data.yml')

interface DataProps {
  title: string
  tag: string
  details: string
}

export type Data = [string, DataProps][]
export const getData = () => {
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  return Object.entries(matterResult.data as DataProps[])
}
