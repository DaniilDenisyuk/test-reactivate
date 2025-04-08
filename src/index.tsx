import { observer } from 'mobx-react'
import { createRoot } from 'react-dom/client'
import BookController from './book/application/BookController'
import BookRepository from './book/application/BookRepository'
import BookList from './book/presentation/BookList'
import PrivateBookHeader from './book/presentation/PrivateBookHeader'
import ApiGateway from './common/ApiGateway'
import UiController from './ui/application/UiController'
import UiModeSwitch from './ui/presentation/UiModeSwitch'

import AddBookButton from './book/presentation/AddBookButton'
import './styles.css'

const uiController = new UiController()
const bookController = new BookController(
  new BookRepository(new ApiGateway()),
  uiController
)

const App = observer(function App({
  uiController,
  bookController
}: {
  uiController: UiController
  bookController: BookController
}) {
  return (
    <div>
      <PrivateBookHeader count={bookController.privateBookCount} />
      <main>
        <UiModeSwitch mode={uiController.mode} change={uiController.change} />
        <BookList list={bookController.list} />
        {bookController.shouldShowAddBookButton && (
          <AddBookButton addBook={bookController.addBook} />
        )}
      </main>
    </div>
  )
})

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(
  <App uiController={uiController} bookController={bookController} />
)
