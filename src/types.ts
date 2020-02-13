interface CockpitCollectionItem {
  _modified: number
  _created: number
  _pid?: number
  _mby: string
  _by: string
  _id: string
  _o: number
}

export interface Slide extends CockpitCollectionItem {
  caption: string
  image: {
    path: string
  }
}
