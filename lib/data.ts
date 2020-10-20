import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const fullPath = path.join(process.cwd(), 'data', 'data.yml')

export function getData() {
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  return matterResult.data
}
