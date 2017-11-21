// 关注的作者类
export default class Author {
  constructor ({id, avatar, username, desc}) {
    this.id = id
    this.avatar = avatar
    this.username = username
    this.desc = desc
  }
}

export function createAuthor (author) {
  return new Author({
    id: author.user_id,
    avatar: author.web_url,
    username: author.user_name,
    desc: author.desc
  })
}
