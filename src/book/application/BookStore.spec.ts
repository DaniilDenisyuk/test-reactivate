import UiStore from '@/ui/application/UiStore'
import { UiMode } from '@/ui/domain/utils'
import type { Book } from '../domain/utils'
import BookRepository from './BookRepository'
import BookStore from './BookStore'

jest.mock('./BookRepository', () => {
  return function () {
    return {
      getBooks: async () => publicBooksMock,
      getPrivateBooks: async () => privateBooksMock,
      addBook: async (data: Book) => {
        publicBooksMock.push(data)
        return true
      }
    }
  }
})

const publicBooksMock: Book[] = [
  { author: 'Frank Gerbert', name: 'Dune' },
  { author: 'Frank Gerbert', name: 'Messiah of Dune' },
  { author: 'Frank Gerbert', name: 'Children of Dune' }
]
const privateBooksMock = publicBooksMock.slice(0, 1)

const bookRepoMock = new (BookRepository as jest.Mock)()
const uiStore = new UiStore()
const bookStore = new BookStore(bookRepoMock, uiStore)

describe('Book Store behavior testing', () => {
  test('Should get both lists', async () => {
    await bookStore.fetchAll()
    expect(bookStore.publicList).toStrictEqual(publicBooksMock)
    expect(bookStore.privateList).toStrictEqual(privateBooksMock)
  })

  test('Should have correct list according UiStore mode', () => {
    uiStore.change(UiMode.public)
    expect(bookStore.list).toBe(bookStore.publicList)
    uiStore.change(UiMode.private)
    expect(bookStore.list).toBe(bookStore.privateList)
  })

  test('Should create new book and fetch new list', async () => {
    const data = {
      name: 'Reve ta stogne Dnipr shirokiy',
      author: 'Taras Shevchenko'
    }
    await bookStore.addBook(data)
    await bookStore.fetchPublicList()
    expect(bookStore.publicList).toContain(data)
  })
})
