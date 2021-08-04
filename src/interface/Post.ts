import Photo from './Photo';
import EnumColor from '@/enum/EnumColor'
export default interface Post {
  postId: number,
  title: string
  from: string
  to: string
  photos?: Photo[]
  color: EnumColor
}