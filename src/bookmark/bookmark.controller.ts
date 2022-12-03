import { Body, Controller, Post } from "@nestjs/common";
import { BookmarkService } from "./bookmark.service";
import { CreateBookmarkDTO } from "./dto/create-bookmark.dto";

@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkSerive: BookmarkService) {}

  @Post('register')
  registerBookmark(@Body() createBookarkDto: CreateBookmarkDTO) {
    return this.bookmarkSerive.create(createBookarkDto);
  }
}