import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { EnvModule } from 'src/env/env.module'
import { EnvService } from 'src/env/env.service'
import { StealthExService } from './stealhtex.service'
import { StealhExResolver } from './stealthex.resolver'

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: async (env: EnvService) => ({
        baseURL: env.STEALTH_EX_BASE_URL,
        params: {
          api_key: env.STEALTH_EX_API_KEY,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    EnvModule,
  ],
  providers: [StealthExService, StealhExResolver],
})
export class StealthexModule {}
