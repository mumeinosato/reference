import { Injectable } from '@nestjs/common';
import { Post } from './post.models';

@Injectable()
export class PostService {
  async Post(post: Post): Promise<any> {
    try {
      await post.create();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
