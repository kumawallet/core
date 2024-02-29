export interface CoinMarketTokenPrice {
  [key: tokenSymbol]: TokenPrice[]
}

export interface TokenPrice {
  name: string
  symbol: string
  quote: {
    USD: {
      price: number | null
      percent_change_1h: number
      percent_change_24h: number
      percent_change_7d: number
    }
  }
}
type tokenSymbol = string

export interface Tokens {
  tokens: Token[]
}

export interface Token {
  name: string
  symbol: string
  usd: number | null
}
