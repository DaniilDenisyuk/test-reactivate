import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import BookRepository from './book/application/BookRepository'
import BookStore from './book/application/BookStore'
import BookList from './book/presentation/BookList'
import PrivateBookHeader from './book/presentation/PrivateBookHeader'
import ApiGateway from './common/ApiGateway'
import UiStore from './ui/application/UiStore'
import UiModeSwitch from './ui/presentation/UiModeSwitch'

import './styles.css'

const uiStore = new UiStore()
const bookStore = new BookStore(new BookRepository(new ApiGateway()), uiStore)

const App = observer(function App({
  uiStore,
  bookStore
}: {
  uiStore: UiStore
  bookStore: BookStore
}) {
  useEffect(() => {
    bookStore.fetchAll()
  }, [])
  return (
    <div>
      <PrivateBookHeader count={bookStore.privateList.length} />
      <main>
        <UiModeSwitch mode={uiStore.mode} change={uiStore.change} />
        <BookList
          list={bookStore.list}
          addBook={bookStore.addBook}
          fetchPublicList={bookStore.fetchPublicList}
        />
      </main>
    </div>
  )
})

const rootElement = document.getElementById('root')!

createRoot(rootElement).render(<App uiStore={uiStore} bookStore={bookStore} />)
