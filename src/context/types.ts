export type UserT = {
  avatarUrl: string
  id: string
  name: string
}

export type Nullable<A> = A | null
export type Effect<A> = (arg: A) => void
export type Lazy<A> = () => A
