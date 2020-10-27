import React from 'react'
import Pips from './pips'

interface PageableProps {

}
const Pageable: React.FC<PageableProps> = ({ children }) => {
  // React.useEffect(() => {
  //   new Pageable('main', {freeScroll: true})
  // }, [])
  let links: {[id: string]: string} = {}
  React.Children.forEach(children, element => {
    if(!React.isValidElement(element)) return
    const {name, tag} = element.props
    links[name] = tag
  })
  return (
    <>
      <main>{children}</main>
      <Pips links={links}/>
      <style jsx>{`
        main {
          min-height: 100vh;
          width: 100%;
        }
      `}</style>
    </>
  )
}

export default Pageable