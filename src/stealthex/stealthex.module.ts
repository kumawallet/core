import { Module } from '@nestjs/common'
import { EnvModule } from 'src/env/env.module'
import { StealthExService } from './stealhtex.service'

@Module({
  imports: [EnvModule],
  providers: [StealthExService],
})
export class StealthexModule {}
