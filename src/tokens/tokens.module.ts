import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { EnvModule } from 'src/env/env.module'
import { TokensResolver } from './tokens.resolver'
import { TokensService } from './tokens.service'

@Module({
  imports: [HttpModule, EnvModule],
  providers: [TokensService, TokensResolver],
  exports: [TokensService],
})
export class TokensModule {}
