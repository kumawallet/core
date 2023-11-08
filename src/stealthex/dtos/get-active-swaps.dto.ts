import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ActiveSwaps {
  @Field(() => String)
  id: string = ''

  @Field(() => String)
  currencyFrom: string = ''

  @Field(() => String)
  currencyTo: string = ''

  @Field(() => String, { nullable: true })
  iconFrom: string = ''

  @Field(() => String, { nullable: true })
  iconTo: string = ''

  @Field(() => String)
  amountFrom: string = ''

  @Field(() => String)
  amountTo: string = ''

  @Field(() => String)
  addressFrom: string = ''

  @Field(() => String)
  addressTo: string = ''

  @Field(() => String)
  status: string = ''
}

@ArgsType()
export class ActiveSwapsArgs {
  @Field(() => [String])
  swapsIds: string[] = []
}
