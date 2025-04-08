import { observer } from 'mobx-react'
import BookStore from '../application/BookStore'
import Book from './Book'

export type BookProps = Pick<
  BookStore,
  'list' | 'addBook' | 'fetchPublicList'
> &
  React.HTMLAttributes<HTMLDivElement>

//There were doubts where to put fetchPublicList functionality
//, but mobx does not provide a way to handle mutation side effects.
// I decided to make components responsible for side effects, like with index.ts
export default observer(function BookList({
  list,
  addBook,
  fetchPublicList,
  ...rest
}: BookProps) {
  return (
    <div {...rest}>
      <ul>
        {list.map((book, i) => (
          <li key={i}>
            <Book author={book.author} name={book.name} />
          </li>
        ))}
        <button
          onClick={async () => {
            await addBook({
              author: 'John Doe',
              name: 'A true story of John Doe'
            })
            fetchPublicList()
          }}
        >
          Add
        </button>
      </ul>
    </div>
  )
})
