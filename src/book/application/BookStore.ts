import { boundMethod } from '@/common/utils'
import type UiStore from '@/ui/application/UiStore'
import { UiMode } from '@/ui/domain/utils'
import { action, computed, observable } from 'mobx'
import type { Book } from '../domain/utils'
import BookRepository from './BookRepository'

export default class BookStore {
  constructor(
    private readonly repository: BookRepository,
    private readonly uiStore: UiStore
  ) {}

  @observable accessor publicList: Book[] = []

  @observable accessor privateList: Book[] = []

  @computed
  get list(): Book[] {
    return this.uiStore.mode === UiMode.private
      ? this.privateList
      : this.publicList
  }

  @action.bound
  public async fetchPublicList() {
    this.publicList = await this.repository.getBooks()
  }
  @action.bound
  public async fetchPrivateList() {
    this.privateList = await this.repository.getPrivateBooks()
  }
  public async fetchAll() {
    await Promise.allSettled([this.fetchPrivateList(), this.fetchPublicList()])
  }

  @boundMethod
  public async addBook(data: Book): Promise<boolean> {
    return await this.repository.addBook(data)
  }
}
