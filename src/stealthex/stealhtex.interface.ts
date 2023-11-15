export interface StealthExApiError {
  code: number
  message: string
}

export interface StealthExToken {
  symbol: string
  has_extra_id: boolean
  extra_id: string
  name: string
  warnings_from: string[]
  warnings_to: string[]
  validation_address: string
  validation_extra: string
  address_explorer: string
  tx_explorer: string
  image: string
  network: string
}

export interface StealthExPairTokens {
  asset: string
  pairs: string[]
}

export interface StealthExEstimatedAmount {
  estimated_amount: string
}

export interface StealthExMinimalAmount {
  min_amount: string
}

export interface StealthExExchangeAmounts {
  estimated: string
  min: string
}

export interface StealthExExchangeCurrency {
  symbol: string
  has_extra_id: boolean
  extra_id: string
  name: string
  warnings_from: string[]
  warnings_to: string[]
  validation_address: string
  validation_extra: string
  address_explorer: string
  tx_explorer: string
  image: string
}

export interface StealthExExchange {
  id: string
  type: string
  timestamp: string
  updated_at: string
  currency_from: string
  currency_to: string
  amount_from: string
  expected_amount: string
  amount_to: string
  address_from: string
  address_to: string
  extra_id_from: string
  extra_id_to: string
  tx_from: string
  tx_to: string
  status: string
  refund_address: string
  refund_extra_id: string
  currencies: {
    [key: string]: StealthExExchangeCurrency
  }
}

export interface StealthExSwapResponse {
  destination?: string
  id?: string
  error?: string
}

export interface StealthExExchangeSimpleInfo extends Pick<StealthExExchange, 'id' | 'status'> {
  currencyFrom: string
  currencyTo: string
  iconFrom: string
  iconTo: string
  amountFrom: string
  amountTo: string
  addressFrom: string
  addressTo: string
}
