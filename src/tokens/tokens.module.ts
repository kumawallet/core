import { HttpModule } from '@nestjs/axios'
import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { EnvModule } from 'src/env/env.module'
import { EnvService } from 'src/env/env.service'
import { TokensResolver } from './tokens.resolver'
import { TokensService } from './tokens.service'

@Module({
  imports: [
    CacheModule.register(),
    HttpModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (env: EnvService) => ({
        baseURL: env.COINMARKETCAP_BASE_URL,
        headers: {
          'X-CMC_PRO_API_KEY': env.COINMARKETCAP_API_KEY,
        },
      }),
    }),
    EnvModule,
  ],
  providers: [TokensService, TokensResolver],
  exports: [TokensService],
})
export class TokensModule {}
