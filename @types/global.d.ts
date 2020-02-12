declare global {
  import { TweenMax as ITweenMax } from 'gsap'
  import { Draggable as IDraggable } from 'gsap/Draggable'
  import { InertiaPlugin as IInertiaPlugin } from 'gsap/InertiaPlugin'

  declare var TweenMax: ITweenMax
  declare var Draggable: IDraggable
  declare var InertiaPlugin: IInertiaPlugin
}

declare module '!!raw-loader*' {
  const payload: string
  export default payload
}
