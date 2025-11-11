import { sync } from 'glob'
import matter from 'gray-matter'
import path from 'path'
import fs from 'fs'
import readingTime from 'reading-time'
import dayjs from 'dayjs'

const BASE_PATH = 'src/posts'
const POSTS_PATH = path.join(process.cwd(), BASE_PATH)

export interface PostOverview {
  title: string
  date: Date
  desc: string
  tags: string[]
  thumbnail: string
}

export interface Post extends PostOverview {
  name: string
  category: string
  url: string
  content: string
  dateString: string
  readingMinutes: number
}

export interface Category {
  name: string
  count: number
}

const parsePostSummary = (postPath: string) => {
  const normalizedPath = postPath.split(path.sep).join('/')
  const filePath = normalizedPath
    .slice(normalizedPath.indexOf(BASE_PATH))
    .replace(`${BASE_PATH}/`, '')
    .replace('.mdx', '')
  const [category, name] = filePath.split('/')
  const url = `/blog/${category}/${name}`
  return { category, name, url }
}

const parsePostDetail = async (postPath: string) => {
  const file = fs.readFileSync(postPath, 'utf8')
  const { data, content } = matter(file)
  const postOverview = data as PostOverview
  const readingMinutes = Math.ceil(readingTime(content).minutes)
  const dateString = dayjs(postOverview.date).format('YYYY-MM-DD')
  return { ...postOverview, dateString, readingMinutes, content }
}

const parsePost = async (postPath: string): Promise<Post> => {
  const postSummary = parsePostSummary(postPath)
  const postDetail = await parsePostDetail(postPath)
  return { ...postSummary, ...postDetail }
}

const getPostPaths = (category?: string) => {
  const folder = category || '**'
  const postPaths: string[] = sync(`${POSTS_PATH}/${folder}/**/*.mdx`)
  return postPaths
}

export const getPostList = async (category?: string) => {
  const postPaths: string[] = getPostPaths(category)
  const posts = await Promise.all(postPaths.map((path) => parsePost(path)))
  return posts.sort(
    (a, b) =>
      new Date(b.dateString).getTime() - new Date(a.dateString).getTime() ||
      a.title.localeCompare(b.title),
  )
}

export const getPostDetail = async (category: string, name: string) => {
  const postPath = `${POSTS_PATH}/${category}/${name}/content.mdx`
  if (fs.existsSync(postPath)) {
    const post = await parsePost(postPath)
    return post
  } else {
    return null
  }
}

export const getCategoryList = (): Category[] => {
  const categoryPaths: string[] = sync(`${POSTS_PATH}/*`)
  const categoryList: Category[] = categoryPaths
    .map((categoryPath) => {
      const name = categoryPath.split(path.sep).slice(-1)[0]
      const postPaths = getPostPaths(name)
      return {
        name,
        count: postPaths.length,
      }
    })
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))

  return categoryList
}
