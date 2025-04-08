import { observer } from 'mobx-react'
import type BookController from '../application/BookController'

export type AddBookButtonProps = Pick<BookController, 'addBook'> &
  React.ButtonHTMLAttributes<HTMLButtonElement>

export default observer(function AddBookButton({
  addBook
}: AddBookButtonProps) {
  return (
    <button
      onClick={() =>
        addBook({
          author: 'John Doe',
          name: 'A true story of John Doe'
        })
      }
    >
      Add
    </button>
  )
})
