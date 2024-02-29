/* c8 ignore start */
import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Tokens {
  @Field(() => [Token])
  tokens = []
}

@ObjectType()
export class Token {
  @Field(() => String)
  name = ''

  @Field(() => String)
  symbol = ''

  @Field(() => String)
  image = ''

  @Field(() => String)
  network = ''
}

@ObjectType()
export class PairTokensFromNativeCurrency {
  @Field(() => [String])
  pairTokens = []
}
