import { observer } from 'mobx-react'
import React from 'react'
import type { Book } from '../domain/utils'

export type BookProps = Book & React.HTMLAttributes<HTMLDivElement>

export default observer(function Book({ name, author, ...rest }: BookProps) {
  return (
    <div {...rest}>
      {author}: {name}
    </div>
  )
})
