import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateBookmarkDTO } from "./dto/create-bookmark.dto";
import { BookmarkDocument } from "./schemas/bookmark.schema";

@Injectable()
export class BookmarkService {
  constructor(@InjectModel('Bookmark') private readonly bookmarkModel: Model<BookmarkDocument>) {}

  async create(createBookarkDto: CreateBookmarkDTO) {
    const bookmark = await this.bookmarkModel.create(createBookarkDto);

    return {
      ok: true,
      bookmark
    }
  }
}