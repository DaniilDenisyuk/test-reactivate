import { boundMethod } from '@/common/utils'
import type UiController from '@/ui/application/UiController'
import { UiMode } from '@/ui/domain/utils'
import { action, computed, observable } from 'mobx'
import type { Book } from '../domain/utils'
import BookRepository from './BookRepository'

export default class BookController {
  constructor(
    private readonly repository: BookRepository,
    private readonly uiStore: UiController
  ) {
    this.fetchAll()
  }

  @observable accessor publicList: Book[] = []

  @observable accessor privateList: Book[] = []

  @computed
  get list(): Book[] {
    return this.uiStore.mode === UiMode.private
      ? this.privateList
      : this.publicList
  }

  @action
  public async fetchPublicList() {
    this.publicList = await this.repository.getBooks()
  }
  @action
  public async fetchPrivateList() {
    this.privateList = await this.repository.getPrivateBooks()
  }

  public async fetchAll() {
    await Promise.allSettled([this.fetchPrivateList(), this.fetchPublicList()])
  }

  @boundMethod
  public async addBook(data: Book): Promise<boolean> {
    const res = await this.repository.addBook(data)
    if (res) {
      this.fetchAll()
    }
    return res
  }

  @computed
  get shouldShowAddBookButton(): boolean {
    return this.uiStore.mode === UiMode.public
  }

  @computed
  get privateBookCount(): number {
    return this.privateList.length
  }
}
