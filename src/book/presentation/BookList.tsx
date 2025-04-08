import { observer } from 'mobx-react'
import type BookController from '../application/BookController'
import Book from './Book'

export type BookListProps = Pick<BookController, 'list'> &
  React.OlHTMLAttributes<HTMLOListElement>

export default observer(function BookList({ list, ...rest }: BookListProps) {
  return (
    <ol {...rest}>
      {list.map((book, i) => (
        <li key={i}>
          <Book author={book.author} name={book.name} />
        </li>
      ))}
    </ol>
  )
})
