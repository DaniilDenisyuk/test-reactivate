import classNames from 'classnames'
import { observer } from 'mobx-react'
import { container } from './index.module.css'

export type HeaderProps = {
  count: number
} & React.HTMLAttributes<HTMLDivElement>

export default observer(function PrivateBookHeader({
  count,
  className,
  ...rest
}: HeaderProps) {
  return (
    <header {...rest} className={classNames(container, className)}>
      <h3>my book count: {count}</h3>
    </header>
  )
})
