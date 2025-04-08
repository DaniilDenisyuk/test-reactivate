import UiController from '@/ui/application/UiController'
import { UiMode } from '@/ui/domain/utils'
import type { Book } from '../domain/utils'
import BookController from './BookController'
import BookRepository from './BookRepository'

const publicBooksMock: Book[] = [
  { author: 'Frank Gerbert', name: 'Dune' },
  { author: 'Frank Gerbert', name: 'Messiah of Dune' },
  { author: 'Frank Gerbert', name: 'Children of Dune' }
]
const privateBooksMock = publicBooksMock.slice(0, 1)

jest.mock('./BookRepository', () => {
  return function () {
    return {
      getBooks: async () => publicBooksMock,
      getPrivateBooks: async () => privateBooksMock,
      addBook: async (data: Book) => {
        publicBooksMock.push(data)
        privateBooksMock.push(data)
        return true
      }
    }
  }
})

const bookRepoMock = new (BookRepository as jest.Mock)()
const uiController = new UiController()
const bookController = new BookController(bookRepoMock, uiController)

describe('Book Controller behavior testing', () => {
  test('Should get both lists', async () => {
    await bookController.fetchAll()
    expect(bookController.publicList).toStrictEqual(publicBooksMock)
    expect(bookController.privateList).toStrictEqual(privateBooksMock)
  })

  test('Should have correct list according UiController mode', () => {
    uiController.change(UiMode.public)
    expect(bookController.list).toBe(bookController.publicList)
    uiController.change(UiMode.private)
    expect(bookController.list).toBe(bookController.privateList)
  })

  test('Should show button if UiController mode is public', () => {
    uiController.change(UiMode.public)
    expect(bookController.shouldShowAddBookButton).toBe(true)
  })

  test('Should show correct private book count', () => {
    expect(bookController.privateBookCount).toBe(
      bookController.privateList.length
    )
  })

  test('Should create new book and fetch new lists', async () => {
    const data = {
      name: 'Reve ta stogne Dnipr shirokiy',
      author: 'Taras Shevchenko'
    }
    await bookController.addBook(data)
    await new Promise((r) => setTimeout(r, 100))
    expect(bookController.publicList).toContainEqual(data)
    expect(bookController.privateList).toContainEqual(data)
  })
})
