import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { Interval } from '@nestjs/schedule'
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino'
import { catchError, firstValueFrom, map } from 'rxjs'
import { TokensSymbols } from './dtos/array-tokens-symbol'
import { Token, CoinMarketTokenPrice, TokenPrice } from './tokens.interface'
import { EnvService } from '../env/env.service'

@Injectable()
export class TokensService {
  private tokens: Token[] = []
  constructor(
    @InjectPinoLogger(TokensService.name)
    private readonly logger: PinoLogger,
    private readonly httpService: HttpService,
    private readonly envService: EnvService,
  ) {}

  getTokensPrice(symbol: string[]): Token[] {
    return this.tokens.filter((element) => symbol.includes(element.symbol))
  }

  async fetchTokensPrices(symbols: string[]): Promise<CoinMarketTokenPrice> {
    const response = await this.httpService
      .get('https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': this.envService.COINMARKETCAP_API_KEY,
        },
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
  //It is suggested to use 23529 if switching to the Hobbyist plan
  @Interval(259200)
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
      this.tokens = newPrices
    } catch (error) {
      this.logger.error(JSON.stringify(error, null, 2), 'Error updating token prices')
    }
  }
}
