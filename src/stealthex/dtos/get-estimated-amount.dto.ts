/* c8 ignore start */
import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

@ArgsType()
export class GetEstimatedAmount {
  @Field(() => String)
  from: string = ''

  @Field(() => String)
  to: string = ''

  @Field(() => String)
  amount: string = ''
}

@ObjectType()
export class EstimatedAmount {
  @Field(() => String!, { nullable: true })
  estimated?: string = '0'

  @Field(() => String)
  min: string = '0'
}
