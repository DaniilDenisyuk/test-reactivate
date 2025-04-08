import ApiGateway from '../../common/ApiGateway'
import type { Book } from '../domain/utils'

export default class BookRepository {
  constructor(private readonly apiGateway: ApiGateway) {}

  async getBooks(): Promise<Book[]> {
    const booksDto = await this.apiGateway.get('')
    return booksDto
  }

  async getPrivateBooks(): Promise<Book[]> {
    const booksDto = await this.apiGateway.get('/private')
    return booksDto
  }
  async addBook(data: Book): Promise<boolean> {
    const bookAddDto = await this.apiGateway.post('/', data)
    return bookAddDto && bookAddDto.status === 'ok' ? true : false
  }
}
