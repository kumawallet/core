import { HttpService } from '@nestjs/axios'
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager'
import { Injectable, Inject, OnModuleInit } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { catchError, firstValueFrom, map } from 'rxjs'
import { TokensSymbols } from './dtos/array-tokens-symbol'
import { Token, CoinMarketTokenPrice, TokenPrice } from './tokens.interface'

const UPDATE_PRICES_FRECUENCY_MS = Number(process.env.UPDATE_PRICES_FRECUENCY_MS)
const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000

@Injectable()
export class TokensService implements OnModuleInit {
  constructor(
    @InjectPinoLogger(TokensService.name)
    @Inject(CACHE_MANAGER)
    private readonly logger: PinoLogger,
    private readonly httpService: HttpService,
    private cacheManager: Cache,
  ) {}

  onModuleInit() {
    this.updateTokenPrices()
  }

  async getTokensPrice(symbol: string[]): Promise<Token[]> {
    const tokens: Token[] | undefined = await this.cacheManager.get('tokens')
    return !tokens ? [] : tokens.filter((element) => symbol.includes(element.symbol))
  }

  async fetchTokensPrices(symbols: string[]): Promise<CoinMarketTokenPrice> {
    const response = await this.httpService
      .get('/cryptocurrency/quotes/latest', {
        params: {
          symbol: symbols.join(','),
        },
      })
      .pipe(
        map((res) => res.data.data),
        catchError((error: any) => {
          this.logger.error({ error }, 'Error fetching tokens prices')
          throw new Error(error?.response?.data.message || error.message)
        }),
      )

    const tokens = await firstValueFrom(response)
    return tokens
  }

  @Interval(UPDATE_PRICES_FRECUENCY_MS)
  async updateTokenPrices() {
    try {
      const tokenPrices = await this.fetchTokensPrices(TokensSymbols)
      const newPrices: Token[] = []
      const symbols: string[] = Object.keys(tokenPrices)
      if (symbols.length === 0) return
      symbols.forEach((element) => {
        const token = tokenPrices[element] as TokenPrice[]
        const { name, symbol, quote } = token[0]
        const price = quote.USD.price || 0

        newPrices.push({
          name: name,
          symbol: symbol,
          usd: price,
        })
      })
      await this.cacheManager.set('tokens', newPrices, ONE_DAY_IN_MS)
    } catch (error) {
      this.logger.error(JSON.stringify(error, null, 2), 'Error updating token prices')
    }
  }
}
