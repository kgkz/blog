import { z } from 'zod'

export const schema = z.object({
  email: z
    .string({})
    .min(1, { message: '必須項目です。' })
    .email({ message: 'メールアドレスの形式が不正です。' }),
  name: z
    .string({})
    .min(1, { message: '必須項目です。' })
    .max(30, { message: '30文字以内で入力してください。' }),
  inquiry: z
    .string({})
    .min(1, { message: '必須項目です。' })
    .max(1000, { message: '1000文字以内で入力してください。' }),
})

export type Schema = z.infer<typeof schema>
