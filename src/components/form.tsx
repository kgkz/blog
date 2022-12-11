import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import SendIcon from '@mui/icons-material/Send'
import { Controller, useForm, SubmitHandler } from 'react-hook-form'

type FormInput = {
  email: string
  name: string
  inquiry: string
}

export default function Form() {
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitSuccessful, isSubmitted },
  } = useForm<FormInput>({ mode: 'onBlur' })

  const onSubmit: SubmitHandler<FormInput> = async data =>
    await fetch('/api/form', { method: 'post', body: JSON.stringify(data) })
  {
    if (!isSubmitted) {
      return (
        <Stack component="form" spacing={2} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            Contact Form
          </Typography>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{
              required: '必須項目です。',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'メールアドレスの形式で入力してください。',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                label="メールアドレス"
                placeholder="example@gmail.com"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{
              required: '必須項目です。',
              maxLength: { value: 30, message: '30文字以内で入力してください。' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                label="お名前"
                placeholder="出栗風太"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="inquiry"
            control={control}
            defaultValue=""
            rules={{
              required: '必須項目です。',
              maxLength: { value: 2000, message: '2000文字以内で入力してください。' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                variant="outlined"
                label="内容詳細"
                placeholder="〇〇の詳細について教えてください。"
                multiline
                rows={8}
                error={!!errors.inquiry}
                helperText={errors.inquiry?.message}
              />
            )}
          />
          <Button
            variant="contained"
            type="submit"
            endIcon={<SendIcon />}
            disabled={!isDirty || !isValid || isSubmitting}
          >
            送信する
          </Button>
        </Stack>
      )
    } else {
      return (
        <Typography
          variant="h4"
          component="h2"
          align="center"
          gutterBottom
          sx={{ whiteSpace: 'pre-wrap' }}
        >
          {isSubmitSuccessful
            ? `お問い合わせありがとうございます。
          順次お返しいたしますので少々お待ちください。`
            : `送信に失敗しました。
            お手数ですが、再度お問い合わせください。`}
        </Typography>
      )
    }
  }
}
