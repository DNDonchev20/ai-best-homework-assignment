import { Module } from '@nestjs/common';
import { GroupsController } from './group.controller';
import { GroupService } from './group.service';
@Module({
  controllers: [GroupsController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}