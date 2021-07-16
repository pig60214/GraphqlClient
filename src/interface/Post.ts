import Photo from './Photo';
export default interface Post {
  title: string
  from: string
  to: string
  photos?: Photo[]
}
